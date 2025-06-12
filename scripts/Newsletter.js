const rootSelector = `[data-js-newsletter]`

class Newsletter {

    selectors = {
        root: rootSelector,
        closeButton: `[data-js-news-letter-close-button]`,
        dontShowAgain: `[data-js-dont-show-again]`,
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
    }

    constructor(rootElement) {
        this.rootElement = rootElement,
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)
        this.dontShowAgainElement = this.rootElement.querySelector(this.selectors.dontShowAgain)

        this.safeData = this.loadStorage()
        this.isActive()
        this.bindEvents()
    }

    loadStorage() {
        return localStorage.getItem('Dont-Show-Again')
    }

    saveData() {
        localStorage.setItem('Dont-Show-Again', 'true')
    }
    

    onDontShowAgainClick(event) {
        const isDontShowAgain = event.target.matches(this.selectors.dontShowAgain)

        if(!isDontShowAgain) return

        this.saveData()

        this.rootElement.close()
        document.documentElement.classList.remove(this.stateClasses.isLock)

    }

    isActive() {

        if(this.safeData) return

        setTimeout(() => {
            this.rootElement.showModal()
            document.documentElement.classList.add(this.stateClasses.isLock)
        }, 2000)
    }

    onCloseClick(event) {
        const isCloseButton = event.currentTarget

        if(!isCloseButton) return

        this.rootElement.close()
        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    onKeyDown(event)  {
        const { code , target } = event

        const isEnterKey = code === 'Enter'

        if(isEnterKey && this.rootElement.open && target === this.closeButtonElement) {
            this.rootElement.close()
            document.documentElement.classList.remove(this.stateClasses.isLock)
        }

        if(isEnterKey && this.rootElement.open && target === this.dontShowAgainElement) {
            
        this.saveData()

        this.rootElement.close()
        document.documentElement.classList.remove(this.stateClasses.isLock)
        }
    }

    bindEvents() {
        this.closeButtonElement.addEventListener('click' , (event) => this.onCloseClick(event))
        this.dontShowAgainElement.addEventListener('click' , (event) => this.onDontShowAgainClick(event))
        this.rootElement.addEventListener('keydown' , (event) => this.onKeyDown(event))
    }

}

class NewsletterCollection {
      constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Newsletter(element)
        })
    }
}

export default NewsletterCollection