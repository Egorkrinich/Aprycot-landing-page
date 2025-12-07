export default class RenderProfile {
    selectors = {
        name: document.querySelectorAll(`[data-profile-name]`),
        email: document.querySelectorAll(`[data-profile-email]`),
        phone: document.querySelectorAll(`[data-profile-phone]`),
        address: document.querySelectorAll(`[data-profile-address]`),
        title: document.querySelectorAll(`[data-profile-title]`),
        
        avatar: document.querySelector(`[data-profile-avatar]`),

        reviews: document.querySelector(`[data-profile-reviews]`),
        photos: document.querySelector(`[data-profile-photos]`),
        followers: document.querySelector(`[data-profile-followers]`),
        location: document.querySelector(`[data-profile-location]`),
    
    }
    constructor(userData) {
        this.userData = userData

        this.ignoreKeys = ["firstName", "lastName", "password"]

        this.renderProfileData()
    }
    renderProfileData() {
        this.renderName(this.userData.firstName, this.userData.lastName)

        this.otherData()
    }
    otherData() {
        Object.entries(this.userData).forEach(([key, value]) => {
            if (value === (undefined || null)) return
            if (this.ignoreKeys.includes(key)) return
            if (key === 'avatar') {
                this.selectors.avatar.src = value 
                return
            }
            this.renderOtherData(key, value)
        })
    }
    renderOtherData(key, value) {
        const element = this.selectors[key]
        if (element) {
            if (NodeList.prototype.isPrototypeOf(element) ||
                Array.isArray(element)
            ) {
                element.forEach((el) => el.textContent = value)
            } else {
                element.textContent = value
            }
        }
    }
    renderName(firstName, lastName) {
        this.selectors.name.forEach((el) => {
            el.textContent = `${firstName} ${lastName}`
        })
    } 
}