const rootSelector = `[data-js-team]`

class Team {

    selectors = {
        root: rootSelector,
        teamItem: `[data-js-team-item]`,
        teamSocials: `[data-js-team-socials]`,
        teamSliderDisplay: `[data-js-team-slider-display]`,
        teamPrevButton: `[data-js-team-prev-button]`,
        teamNextButton: `[data-js-team-next-button]`,
    }

    stateClasses = {
        isHover: 'is-hover',
        isActive: 'is-active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.teamItemElement = this.rootElement.querySelectorAll(this.selectors.teamItem)
        this.teamSocialsElement = this.rootElement.querySelectorAll(this.selectors.teamSocials)
        this.teamSliderDisplayElement = this.rootElement.querySelector(this.selectors.teamSliderDisplay)
        this.teamPrevButtonElement = this.rootElement.querySelector(this.selectors.teamPrevButton)
        this.teamNextButtonElement = this.rootElement.querySelector(this.selectors.teamNextButton)
        this.slidesElements = [...this.teamSliderDisplayElement.querySelectorAll(this.selectors.teamItem)]

        this.isHovered = false
        this.slidePerPage = 4
        this.slideIndex = 0
        this.totalSlide = Math.ceil(this.slidesElements.length  / this.slidePerPage)
        this.bindEvents()
        this.onShow(this.slideIndex)
    }

    onShow(index) {
        this.slidesElements.forEach((slide , i) => {
            slide.classList.remove(this.stateClasses.isActive)
         if (
        i >= index * this.slidePerPage &&
        i < (index + 1) * this.slidePerPage
      ) {
        slide.classList.add(this.stateClasses.isActive)
      }
        })
    }

    onPointerEnter(event) {
        const currentItem = event.currentTarget

        const socials = currentItem.querySelectorAll(this.selectors.teamSocials)

        socials.forEach((element) => {
            element.classList.add(this.stateClasses.isHover)
        })
    }

    onPointerLeave(event) {
        const currentItem = event.currentTarget

        const socials = currentItem.querySelectorAll(this.selectors.teamSocials)

        socials.forEach((element) => {
            element.classList.remove(this.stateClasses.isHover)
    })
    }

    onNextButtonClick(event) {
        const isNextButton = event.target.matches(this.selectors.teamNextButton) 

        if(!isNextButton) return

        this.slideIndex = (this.slideIndex + 1) % this.totalSlide
        this.onShow(this.slideIndex)
    }

    onPrevButtonClick(event) {
        const isNextButton = event.target.matches(this.selectors.teamPrevButton) 

        if(!isNextButton) return

        this.slideIndex = (this.slideIndex - 1 + this.totalSlide) % this.totalSlide
        this.onShow(this.slideIndex)
    }

    bindEvents() {
        this.teamItemElement.forEach((element) => {
            element.addEventListener('pointerenter',(event) =>  this.onPointerEnter(event))
    })

    this.teamItemElement.forEach((element) => {
        element.addEventListener('pointerleave' ,(event) => this.onPointerLeave(event))
    })

    this.teamPrevButtonElement.addEventListener('click', (event) => this.onPrevButtonClick(event))
    this.teamNextButtonElement.addEventListener('click', (event) => this.onNextButtonClick(event))
    }

}

class TeamCollection {
        constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Team(element)
        })
    }
}

export default TeamCollection