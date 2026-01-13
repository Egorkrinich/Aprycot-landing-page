export default class Slider {
    constructor(slider, next, prev) {
        this.slider = document.querySelector(`.${slider}`)

        this.slides = this.slider.querySelectorAll('.category__card')

        this.nextButton = document.querySelector(`.${next}`)
        this.prevButton = document.querySelector(`.${prev}`)

        this.currentIndex = 0
        this.autoPlayInterval = null

        this.setListeners()
        // this.showSlide(0)
    }
    setListeners() {
        this.nextButton.addEventListener('click', () => {
            this.showSlide(this.currentIndex + 1, "next")
            console.log('Впиред')
        })
        this.prevButton.addEventListener('click', () => {
            this.showSlide(this.currentIndex - 1, "prev")
            console.log('Назад')
        })
    }
    showSlide(index, direction) {
        if (index < 0) index = this.slides.length - 1
        if (index > this.slides.length - 1) index = 0
        this.currentIndex = index   

        // this.slider.style.transform = `translateX(-${index * 100}%)` 

        this.currentClassManager(index, direction)
    }
    currentClassManager(index, direction) {
        this.slides[index].classList.add('currentSlide')

        const prevSlide = this.slides[index - 1]
        const nextSlide = this.slides[index + 1]
        if (prevSlide !== undefined || 
            nextSlide !== undefined) {
            if (direction) {
                direction === "next" ?
                prevSlide?.classList.remove('currentSlide') :
                nextSlide?.classList.remove('currentSlide')
            }
        }
    }
}