const rootSelector = `[data-js-shop-popup]`

class ShopPopup {

    selectors = {
        root: rootSelector,

        openShopPopup: `[data-js-show-shop-popup]`,
        closeShopPopup: `[data-js-shop-popup-close-button]`,
    }

    stateClasses = {
        isLock: 'is-lock',
     }

    constructor(rootElement) {
    this.rootElement = rootElement
    this.openShopPopupElement = document.querySelector(this.selectors.openShopPopup)
    this.closeShopPopupElement = this.rootElement.querySelector(this.selectors.closeShopPopup)

        this.bindEvents()
    }
    
    onOpenPopupClick(event) {

        const isOpenButtonElement = event.currentTarget

        if(!isOpenButtonElement) return

        this.rootElement.showModal()
        document.documentElement.classList.add(this.stateClasses.isLock)
    }

    onClosePopupClick(event) {

        const isCloseButtonElement = event.currentTarget

        if(!isCloseButtonElement) return

        this.rootElement.close()
        document.documentElement.classList.remove(this.stateClasses.isLock)
    }

    onKeyDown = (event) => {
        const { code , target} = event

        const enterKeyDown = code === 'Enter'

        if(enterKeyDown && this.rootElement.open && target === this.closeShopPopupElement) {
            this.rootElement.close()
            document.documentElement.classList.remove(this.stateClasses.isLock)
        } 

    }

  bindEvents() {
    this.openShopPopupElement.addEventListener('click', (event) => this.onOpenPopupClick(event))
    this.closeShopPopupElement.addEventListener('click', (event) => this.onClosePopupClick(event))
    this.rootElement.addEventListener('keydown' , this.onKeyDown)
}
}

class ShopPopupCollection {
        constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ShopPopup(element)
        })
    }
}

export default ShopPopupCollection