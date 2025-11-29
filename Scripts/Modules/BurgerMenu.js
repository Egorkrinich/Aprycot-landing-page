export default class Menu {
    constructor(attribute, isOverlay) {
        this.menu = document.querySelector(`[data-menu="${attribute}"]`)
        this.button = document.querySelector(`[data-burger-btn="${attribute}"]`)
        this.closeButton = 
        document.querySelector(`[data-close-button="${attribute}"]`)

        if (isOverlay) 
        this.overlay = document.querySelector(`[data-overlay="global"]`)

        this.isMenuActive = false

        this.activeLogic()
    }
    activeLogic() {
        this.overlay?.addEventListener('click', () => {
            this.classManager('close')
        })
        this.closeButton?.addEventListener('click', () => {
            this.classManager('close')
        })
        this.button.addEventListener('click', () => {
            this.classManager(this.isMenuActive ? 'close' : 'open')
        })
        document.addEventListener('keyup', (e) => {
            if (e.code === 'Escape' && this.isMenuActive) {
                this.classManager('close')
            }
        })
    }
    classManager(status) {
        this.isMenuActive = !this.isMenuActive
        const eventStatus = status === 'open'
        const array = [this.menu, this.button, this.overlay]
        array.forEach((el) => {
            el?.classList.toggle('active', eventStatus)
        })
    }
}