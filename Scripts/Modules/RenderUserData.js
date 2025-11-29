export default class RenderUserData {
    constructor(data, name, profileContainer) {
        this.data = JSON.parse(data)
        this.name = document.querySelectorAll(`[${name}]`)
        this.profileContainer = 
        document.querySelector(`[${profileContainer}]`)

        this.renderRequest()
    }
    renderRequest() {
        // Name
        this.setName(
            this.data.firstName,
            this.data.lastName
        ) 
        this.setId(this.data.userId)
        // ...
        
    }
    setName(firstName, lastName) {
        this.name.forEach((el) => {
            el.textContent = `${firstName} ${lastName}`
        })
    }
    setId(id) {
        this.profileContainer.setAttribute('data-user-id', id)
    }
}