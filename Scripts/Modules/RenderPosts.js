import { Templates } from "./Templates.js"

export default class RenderPosts {
    constructor(container, sentinel, id, firstName, lastName) {
        this.container = document.querySelector(`.${container}`)
        this.sentinel = document.querySelector(`.${sentinel}`)
        this.Id = id
        this.firstName = firstName
        this.lastName = lastName
        
        this.observer = null

        this.posts = null

        this.chunk = 0
        this.limit = 5

        this.loadPosts()
    }
    setObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.getChunk()
                }
            })
        },{threshold: 0}
        )
        this.observer.observe(this.sentinel)
    }
    renderPosts(chunk) {
        chunk.forEach((postData) => {
            const postHTML = 
            Templates.postItem(postData, this.firstName, this.lastName)

            this.container.insertAdjacentHTML('beforeend', postHTML)
        })
        if (!this.observer) this.setObserver()  
    }
    getChunk() {
        const start = this.chunk * this.limit
        const end = start + this.limit

        const chunk = this.posts.slice(start, end)
        this.chunk++
        
        this.renderPosts(chunk)
    }
    async loadPosts() {
        if (!this.posts) {
            const res = await fetch('/Data/Posts.json')
            if (!res.ok) throw new Error('failed load posts')
            const json = await res.json()

            this.posts = 
            json.find(({userId}) => userId === this.Id)?.posts ||
            json.find(({userId}) => userId === "demo")?.posts  
        }
        this.getChunk() 
    }
}