class Menu {
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
const menus = document.querySelectorAll('[data-menu]')
.forEach((menu) => {
    new Menu(menu.dataset.menu, menu.dataset.menuOverlay === 'true')
})
class AccordionList {
    constructor(list, accButton, accContent, button) {
        this.container = document.querySelector(`.${list}`)
        // Accordion content
        this.accContents = this.container.querySelectorAll(`[${accContent}]`)
        // Classes
        this.accButtonData = accButton
        this.accContentData = accContent

        // Toggle Buttons
        this.buttons = this.container.querySelectorAll(`.${button}`)
        // Classes
        this.buttonClass = button

        this.startListener()
    }
    startListener() {
        this.container.addEventListener('click', (e) => {
            const accButton = e.target.closest(`[${this.accButtonData}]`)
            if (accButton) {
                this.openAccordion(accButton)
            }
            const button = e.target.closest(`.${this.buttonClass}`)
            if (button) {
                this.toggleActive(button)
                if (!button.hasAttribute(`${this.accButtonData}`)) {
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
        Array.from(this.buttons)
        .find((button) => button.classList.contains('active'))

        if (activeButton && activeButton !== thisButton) {
            activeButton.classList.remove('active')
        }
        thisButton.classList.toggle('active')
    }
}
new AccordionList(
    'burger__nav', 'data-accordion-button', 'data-accordion-content',
    'burger__button'
)
class RenderUserData {
    constructor(data, name) {
        this.data = JSON.parse(data)
        this.name = document.querySelectorAll(`[${name}]`)

        this.renderRequest()
    }
    renderRequest() {
        // Name
        this.setName(
            this.data.firstName,
            this.data.lastName
        )
        // ...
        
    }
    setName(firstName, lastName) {
        this.name.forEach((el) => {
            el.textContent = `${firstName} ${lastName}`
        })
    }
}
// Is user register
document.addEventListener('DOMContentLoaded', () => {
    const userData = localStorage.getItem('userData')
    if (userData) {
        new RenderUserData(userData,'data-userName')
    } else {
        window.location = '/register.html'
    }
})

class Tab {
    constructor(container, button, content) {
        this.container = document.querySelector(`.${container}`)
        this.contents = document.querySelectorAll(`.${content}`)
        this.buttonAttr = button

        this.startListener()
        this.setFirstTab()
    }
    setFirstTab() {
        const button = this.container.firstElementChild
        this.buttonManager(button)
        this.contentManager(button)
    }
    startListener() {
            this.container.addEventListener('click', (e) => {
                const button = e.target.closest(`[${this.buttonAttr}]`)
                if (!button) return
                this.buttonManager(button)
                this.contentManager(button)
            })
    }
    buttonManager(button) {
        [...this.container.children]
        .forEach((button) => {
            button.classList.remove('active')
        })
        button.classList.add('active')
    }
    contentManager(button) {
        this.contents.forEach((content) => {
            content.classList.toggle('active', 
            content.dataset.tabContent === button.dataset.tabButton)
        })
    }
    
}
if (window.location.pathname === '/profile.html') {
    new Tab('profile__tab-container', 'data-tab-button', 'profile__tab-content')

}