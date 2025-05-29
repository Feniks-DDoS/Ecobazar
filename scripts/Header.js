const rootSelector = `[data-js-header]`

class BurgerButton {
    selectors = {
        root: rootSelector,
        burgerButton: `[data-js-header-burger-button]`,
        overlay: `[data-js-header-overlay]`
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton)
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay)

        this.bindEvents()
    }

    onBurgerButtonClick = () => {
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive)
        this.overlayElement.classList.toggle(this.stateClasses.isActive)

      document.documentElement.classList.toggle(this.stateClasses.isLock)
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click' , this.onBurgerButtonClick)
    }
}

class BurgerButtonCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new BurgerButton(element)
        })
    }
}

export default BurgerButtonCollection