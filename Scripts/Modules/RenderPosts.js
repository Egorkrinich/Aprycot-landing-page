import { Templates } from "../Templates/Templates.js"

export default class RenderPosts {
    constructor(container, sentinel, id, avatar, firstName, lastName) {
        this.container = document.querySelector(`.${container}`)
        this.sentinel = document.querySelector(`.${sentinel}`)
        this.id = id

        this.avatar = avatar
        this.firstName = firstName
        this.lastName = lastName
        
        this.observer = null

        this.posts = null
        this.comments = null

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
            Templates.postItem(postData, this.avatar, this.firstName, this.lastName)

            this.container.insertAdjacentHTML('beforeend', postHTML)
        })
        if (!this.observer) this.setObserver()  
    }
    getTime(id) {
        const diff = Date.now() - id

        const units = [
          { label: "year",   value: 1000 * 60 * 60 * 24 * 365 },
          { label: "month",  value: 1000 * 60 * 60 * 24 * 30 },
          { label: "day",    value: 1000 * 60 * 60 * 24 },
          { label: "hour",   value: 1000 * 60 * 60 },
          { label: "minute", value: 1000 * 60 },
          { label: "second", value: 1000 }
        ];

        for (const unit of units) {
            const value = Math.floor(diff / unit.value)
            if (value >= 1) {
                return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`
            }
        }
    }
    async getAdditionalValue(chunk) {
        try {
            if (!this.comments) {
                const res = await fetch('./Data/Comments.json')
                if (!res.ok) throw new Error('failed load comments value')
                this.comments = await res.json()
            } 
        } catch(rej) {
            console.error(rej)
        }

        chunk.forEach((post) => {
            const comments = 
            this.comments
            .find(({postId}) => postId === post.postId)?.Comments

            post.comments = comments?.length || 0
            post.time = this.getTime(post.postId)
        })
        this.renderPosts(chunk)
    }
    getChunk() {
        if (this.posts && this.posts.length > 0) {
            const start = this.chunk * this.limit
            const end = start + this.limit

            const chunk = this.posts.slice(start, end)
            this.chunk++
            
            this.getAdditionalValue(chunk)
        } else {
            this.renderAbsence()
        }
    }
    async loadPosts() {
        if (!this.posts) {
            const res = await fetch('./Data/Posts.json')
            if (!res.ok) throw new Error('failed load posts')
            const json = await res.json()

            this.posts = json.find(({userId}) => userId === this.id)?.posts || []
        }
        this.getChunk() 
    }
    renderAbsence() {
        this.container.innerHTML =
        `
        <div class="post__item general-column__item">
        Posts Absence
        </div>
        `
    }
}