import { Templates } from "../Templates/Templates.js"

export default class RenderComments {
    selectors = {
        commsWrapper: 'comments-wrapper',
        commsContainer: 'comments__container',
        commsButton: 'interaction__comments-button',
        moreButton: 'show-more',

        postCard: 'data-post-id'
    }
    constructor(container) {
        this.container = document.querySelector(`.${container}`)

        this.comments = null
        this.commentsContainer = null
        
        this.commentsArray = []
        this.commentsUserArray = []
        
        this.limit = 10

        this.setListener()
    }
    renderComments(chunk, commentsWrapper) {
        chunk?.forEach((comment) => {
            const postHTML = 
            Templates.commentItem(comment)

            commentsWrapper.querySelector(`.${this.selectors.commsContainer}`)
            .insertAdjacentHTML('beforeend', postHTML)
        })
    }
    getChunk(id, commentsWrapper) {
        const commentInfo = this.findCommentInfo(id)
        
        const start = commentInfo.chunk * this.limit
        const end = start + this.limit

        const comments = commentInfo.comments || []
        const chunk = comments.slice(start, end)
        commentInfo.chunk++
        
        this.getAdditionalData(chunk, commentsWrapper)

        if (end >= (commentInfo.comments?.length || 0)) {
            const moreButton = commentsWrapper.querySelector(`.${this.selectors.moreButton}`)
            if (moreButton) moreButton.style.display = 'none'
        }
    }
    async getAdditionalData(chunk, commentsWrapper) {
        try {
            if (!this.commentsUserArray.length) {
                const res = await fetch('./Data/Users.json')
                if (!res.ok) throw new Error('failed load comments value')
                this.commentsUserArray = await res.json()
            } 
        } catch(rej) {
            console.error(rej)
        }

        chunk.forEach((comment) => {
            const [avatar, firstName, lastName] = this.findCommentUser(comment.userId)
            comment.avatar = avatar
            comment.firstName = firstName
            comment.lastName = lastName
        })
        this.renderComments(chunk, commentsWrapper)
    }
    async loadComments(id, commentsWrapper) {
        try {
            if (!this.findCommentInfo(id)) {
            const res = await fetch('./Data/Comments.json')
            if (!res.ok) throw new Error('failed load posts')

            const json = await res.json()

            const commentInfo = {
                postId: id,
                chunk: 0,
                comments: json?.find(({postId}) => postId === id)?.Comments || []
            }
            this.commentsArray.push(commentInfo)
        }
        } catch(rej) {
            console.error(rej)
        }
        this.getChunk(id, commentsWrapper) 
    }
    setListener() {
        this.container.addEventListener('click', (e) => {
            const commentsButton = e.target.closest(`.${this.selectors.commsButton}`)
            const moreButton = e.target.closest(`.${this.selectors.moreButton}`)
            if (commentsButton) {
                const [postCard, comments, commsContainer] =
                this.getElements(commentsButton)

                if (commsContainer.childElementCount === 0) {
                    this.loadComments(
                        Number(postCard.dataset.postId),
                        comments    
                    )
                }
                this.toggleComments(commentsButton, comments)
            }
            if (moreButton) {
                const [postCard, comments] =
                this.getElements(moreButton)

                this.loadComments(
                    Number(postCard.dataset.postId),
                    comments
                )
                setTimeout(() => {
                    comments.style.maxHeight = comments.scrollHeight + 'px'
                }, 50)
            }
        })
    }
    // Helper methods
    getElements(el) {
        const postCard = el.closest(`[${this.selectors.postCard}]`)
        const comments = postCard.querySelector(`.${this.selectors.commsWrapper}`)
        const commsContainer = postCard.querySelector(`.${this.selectors.commsContainer}`)

        return [postCard, comments, commsContainer]
    }
    toggleComments(button, comments) {
        setTimeout(() => {
            button.classList.toggle('active')
            if (comments.style.maxHeight) {
                comments.style.maxHeight = null
            } else {
                comments.style.maxHeight = comments.scrollHeight + 'px'
            }
        }, 50)
    }
    findCommentInfo(id) {
        return this.commentsArray.find(({postId}) => postId === id)
    }
    findCommentUser(userId) {
        const user = this.commentsUserArray.find(({id}) => id === userId)
        if (!user) return ['./Image/Avatars/Profile-1.png', 'Unknown', 'Unknown' ]
        return [user.avatar, user.firstName, user.lastName]
    }
}