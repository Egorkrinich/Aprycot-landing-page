class Menu {
    constructor(attribute, isOverlay) {
        this.menu = document.querySelector(`[data-menu="${attribute}"]`)
        this.button = document.querySelector(`[data-button="${attribute}"]`)
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
const menus = document.querySelectorAll('[data-menu]')
.forEach((menu) => {
    new Menu(menu.dataset.menu, menu.dataset.menuOverlay === 'true')
})
class AccordionList {
    constructor(list, accButton, accContent, button) {
        this.container = document.querySelector(`.${list}`)
        // Accordion
        this.accContents = this.container.querySelectorAll(`.${accContent}`)
        // Classes
        this.accButtonClass = accButton
        this.accContentClass = accContent
        // Toggle Buttons
        this.buttons = this.container.querySelectorAll(`.${button}`)
        // Classes
        this.buttonClass = button

        this.startListener()
    }
    startListener() {
        this.container.addEventListener('click', (e) => {
            const accButton = e.target.closest(`.${this.accButtonClass}`)
            if (accButton) {
                this.openAccordion(accButton)
            }
            const button = e.target.closest(`.${this.buttonClass}`)
            if (button) {
                this.toggleActive(button)
                if (!button.classList.contains(`${this.accButtonClass}`)) {
                    this.closeAccordions()
                }
            }
        })
    }
    openAccordion(accButton) {
        const content = accButton.nextElementSibling

        if (content.style.maxHeight) {
            content.style.maxHeight = null
        } else {
            this.closeAccordions()
            content.style.maxHeight = content.scrollHeight + 'px'
        }
    }
    closeAccordions() {
        this.accContents.forEach((content) => {
                content.style.maxHeight = null
            })
    }
    toggleActive(thisButton) {
        const activeButton = 
        this.container.querySelector(`.${this.buttonClass}.active`)

        if (activeButton && activeButton !== thisButton) {
            activeButton.classList.remove('active')
        }
        thisButton.classList.toggle('active')
    }
}
new AccordionList(
    'Burger__nav', 'Accordion__button', 'Accordion__content',
    'Burger__button'
)