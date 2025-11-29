export default class AccordionList {
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