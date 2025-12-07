export default class RenderCurrentUser {
    selectors = {
        profileContainer: document.querySelector('[data-profile-link]'),
        name: document.querySelectorAll('[data-current-name]'),
        avatar: document.querySelector('[data-current-avatar]'),
        title: document.querySelectorAll('[data-current-title]')
    }
    constructor(data) {
        this.data = data

        this.renderRequest()
    }
    renderRequest() {
        // name
        this.setName(
            this.data.firstName,
            this.data.lastName
        ) 
        // id
        this.setId(this.data.userId)
        // avatar
        this.setAvatar(this.data.avatar)
        
    }
    setName(firstName, lastName) {
        this.selectors.name.forEach((el) => {
            el.textContent = `${firstName} ${lastName}`
        })
    }
    setId(id) {
        if (this.selectors.profileContainer) 
            this.selectors.profileContainer.dataset.userId = id
    }
    setAvatar(avatar) {
        if (this.selectors.avatar) this.selectors.avatar.src = avatar
    }
}