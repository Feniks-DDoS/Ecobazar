
const rootSelector = `[data-js-quick-view-open]`

class QuickView {

    selectors = {
        root: rootSelector,
        openButton: `[data-js-quick-view-open-button]`,
        closeButton: `[data-js-quick-view-close-button]`,
        quickView: `[data-js-quick-view]`,
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.openButtonElements = this.rootElement.querySelectorAll(this.selectors.openButton)
        this.closeButtonElement = document.querySelector(this.selectors.closeButton)
        this.quickViewElement = document.querySelector(this.selectors.quickView)

        this.bindEvents()
    }

    onOpenClick(event) {

        const { target } = event

        const isOpenButtonElement = target.matches(this.selectors.openButton)

        
        if(!isOpenButtonElement) return

        this.quickViewElement.classList.add(this.stateClasses.isActive)
        
        document.documentElement.classList.add(this.stateClasses.isLock)

    }

    onCloseClick(event) {
         const { target } = event

        const isCloseButtonElement = target.matches(this.selectors.closeButton)

        
        if(!isCloseButtonElement) return

        this.quickViewElement.classList.remove(this.stateClasses.isActive)

        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    bindEvents() {
        document.addEventListener('click' , (event) => this.onOpenClick(event))
        this.closeButtonElement.addEventListener('click' , (event) => this.onCloseClick(event))

    }

}

class QuickViewCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new QuickView(element)
        })
    }
}

export default QuickViewCollection