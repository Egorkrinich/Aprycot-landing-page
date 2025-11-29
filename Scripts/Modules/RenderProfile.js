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
    constructor(id) {
        this.id = id

        this.loadData()
    }
    loadData() {
        // fetch(`user/${this.userId}`)
        const userData = JSON.parse(localStorage.getItem('userData'))
        this.loadName(userData.firstName, userData.lastName)
        this.renderUserProfile(userData)

        fetch(`users.json`)
        .then((res) => res.json())
        .then((json) => {
            const jsonUser = 
            json.find(({userId}) => userId === this.id) ||
            json.find(({userId}) => userId === 'demo')

            if (jsonUser) {
                this.renderUserProfile(jsonUser)
            }
        })
        .catch((rej) => console.error(rej))
    }
    renderUserProfile(userData) {
        Object.entries(userData).forEach(([key, value]) => {
            const el = this.selectors[key]
            if (key === 'firstName' || key === 'lastName') return 
            if (el) {
                el.forEach((el) => {
                    el.textContent = value
                })
            }
        })
    }
    loadName(firstName, lastName) {
        this.selectors.name.forEach((name) => {
            name.textContent = `${firstName} ${lastName}`
        })
    }
    
}