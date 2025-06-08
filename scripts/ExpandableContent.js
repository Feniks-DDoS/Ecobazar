import pxToRem from "./utils/pxToRem.js"

const rootSelector = `[data-js-tabs]`

class ExpandapleContent {

    selectors = {
        root: rootSelector,
        expandebleContent: `[data-js-expandable-content]`,
        openButton: `[data-js-open-expandable-content]`,
        closeButton: `[data-js-close-expandable-content]`,
    }

    stateClasses = {
        isExpanded: 'is-expanded',
        isClose: 'is-close',
    }

    animationParams = {
        duration: 500,
        easing: 'ease',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.expandebleContentElement = this.rootElement.querySelector(this.selectors.expandebleContent)
        this.openButtonElement = this.rootElement.querySelector(this.selectors.openButton)
        this.closeButtonElement = this.rootElement.querySelector(this.selectors.closeButton)

        this.bindEvents()
    }

    expanded() {
        const { offsetHeight , scrollHeight } = this.expandebleContentElement

        this.expandebleContentElement.classList.add(this.stateClasses.isExpanded)

        this.expandebleContentElement.animate([
            {
                maxHeight: `${pxToRem(offsetHeight)}rem`
            },
            {
                maxHeight: `${pxToRem(scrollHeight)}rem`
            }
        ], this.animationParams)
    }

    close() {
        this.closeButtonElement = this.expandebleContentElement.classList.remove(this.stateClasses.isExpanded)

        this.expandebleContentElement.scrollIntoView({behaivor: 'smooth'})
    }

    onOpenClick = () => {
        this.expanded()
        this.openButtonElement.classList.add(this.stateClasses.isClose)
    }

    onCloseClick = () => {
        this.close()
        this.openButtonElement.classList.remove(this.stateClasses.isClose)
    }

    bindEvents() {
        this.openButtonElement.addEventListener('click' , this.onOpenClick)
        this.closeButtonElement.addEventListener('click' , this.onCloseClick)
    }

}

class ExpandapleContentCollection {
               constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ExpandapleContent(element)
        })
    }
}

export default ExpandapleContentCollection