export default class Tab {
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