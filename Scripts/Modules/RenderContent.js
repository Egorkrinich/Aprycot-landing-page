import { Templates } from "../Templates/Templates.js";

export default class RenderContent {
    constructor(container, template, isTop, amount) {
        this.container = document.querySelector(`.${container}`)
        this.template = template
        this.isTop = isTop
        this.amount = amount

        this.render()
    }
    render() {
        fetch('./Data/Dishes.json')
        .then((res) => res.json())
        .then((json) => {
            let content = null
            if (this.isTop) {
                content = json.filter(({label}) => label !== null)
                .slice(0, this.amount)
            } else {
                content = json.slice(0, this.amount)
            }
            
            this.container.innerHTML = content
            .map((el) => Templates[this.template](el)).join('')
        })
    }
}