const rootSelector = `[data-js-swiper]`


class Slider {
  selectors = {
    swiper: rootSelector,
    nextButton: `[data-js-next-button]`,
    prevButton: `[data-js-prev-button]`,
    slides: `[data-js-slide]`,
    swiperWrapper: `[data-js-swiper-wrapper]`,
  }

  stateClasses = {
    isActive: 'is-active',
  }

  constructor(rootElement) {
    this.rootElement = rootElement
    this.swiperWrapperElement = this.rootElement.querySelector(this.selectors.swiperWrapper)
    this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)
    this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
    this.slidesElements = [...this.swiperWrapperElement.querySelectorAll(this.selectors.slides)]

    this.slidePerPage = 3
    this.slideIndex = 0
    this.totalSlide = Math.ceil(this.slidesElements.length / this.slidePerPage)

    this.bindEvents()
    this.onShow(this.slideIndex)
  }

  onShow(index) {
    this.slidesElements.forEach((slide, i) => {
      slide.classList.remove(this.stateClasses.isActive)
      if (
        i >= index * this.slidePerPage &&
        i < (index + 1) * this.slidePerPage
      ) {
        slide.classList.add(this.stateClasses.isActive)
      }
    })
  }

  onPrevClick() {
    this.slideIndex = (this.slideIndex - 1 + this.totalSlide) % this.totalSlide
    this.onShow(this.slideIndex)

  }

  onNextClick() {
    this.slideIndex = (this.slideIndex + 1) % this.totalSlide
    this.onShow(this.slideIndex)

  }

  bindEvents() {
    this.nextButtonElement.addEventListener('click', (event) => this.onNextClick(event))
    this.prevButtonElement.addEventListener('click', (event) => this.onPrevClick(event))
  }
}

class SliderCollection {
  constructor() {
    this.init()
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    const swiperElement = document.querySelector(rootSelector)
    if (swiperElement) {
      new Slider(swiperElement)
    }
  }
}



export default SliderCollection