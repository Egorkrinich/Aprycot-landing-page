export default class RenderProfile {
    selectors = {
        name: document.querySelectorAll(`[data-profile-name]`),
        email: document.querySelectorAll(`[data-profile-email]`),
        phone: document.querySelectorAll(`[data-profile-phone]`),
        address: document.querySelectorAll(`[data-profile-address]`),
        title: document.querySelectorAll(`[data-profile-title]`),

        reviews: document.querySelectorAll(`[data-profile-reviews]`),
        photos: document.querySelectorAll(`[data-profile-photos]`),
        followers: document.querySelectorAll(`[data-profile-followers]`),
        location: document.querySelectorAll(`[data-profile-location]`),
    }
    constructor(userData) {
        this.userData = userData

        this.renderUserProfile(userData)
        this.renderName(userData.firstName, userData.lastName)
    }
    renderUserProfile(userData) {
        Object.entries(userData).forEach(([key, value]) => {
            if (key === 'firstName' || key === 'lastName') return
            const el = this.selectors[key]
            if (el) {
                el.forEach((el) => {
                    el.textContent = value
                })
            }
        })
    }
    renderName(firstName, lastName) {
        this.selectors.name.forEach((name) => {
            name.textContent = `${firstName} ${lastName}`
        })
    } 
}