import BaseComponent from "./BaseComponent.js"

const rootSelector = `[data-js-tabs]`

class Tabs extends BaseComponent {

    selectors = {
        root: rootSelector,
        tabsButton: `[data-js-tabs-button]`,
        tabsContent: `[data-js-tabs-content]`,
    }

    stateClasses = {
        isActive: 'is-active'
    }

    stateAttribute = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        super()
        this.rootElement = rootElement
        this.tabsButtonElement = this.rootElement.querySelectorAll(this.selectors.tabsButton)
        this.tabsContentElement = this.rootElement.querySelectorAll(this.selectors.tabsContent)

        this.state = this.getProxyState({
            activeTabIndex: [...this.tabsButtonElement]
            .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        })
        this.limitTabIndex = this.tabsButtonElement.length - 1

        this.bindEvents()
    }

    updateUI() {
        const { activeTabIndex } = this.state

        this.tabsButtonElement.forEach((buttonElement , index) => {
            const isActive = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.isActive , isActive)

            buttonElement.setAttribute(this.stateAttribute.ariaSelected , isActive.toString())
            buttonElement.setAttribute(this.stateAttribute.tabIndex , isActive ? "0" : -1)
        })

        this.tabsContentElement.forEach((contentElement , index) => {
            const isActive = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.isActive , isActive)
        })
    }

    activeTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.tabsButtonElement[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0
        ? this.limitTabIndex 
        : thgis.state.activeTabIndex - 1

        this.activeTab(newTabIndex)
    }

    nextTab = () =>  {
        const newTabIndex = this.state.activeTabIndex === this.limitTabIndex
        ? 0
        : this.state.activeTabIndex + 1

        this.activeTab(newTabIndex)
    }

    firstTab = () => {
        this.activeTab(0)
    }

    lastTab = () => {
        this.activeTab(this.limitTabIndex)
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
    }

    onKeyDown = (event) => {
        const { code , metakey } = event

        const actions = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]

        const isMacHomeKey = metakey && code === 'ArrowLeft'

        if(isMacHomeKey) {
            this.firstTab()
            return
        }

        const isMacEndKey = metakey && code === 'ArrowRight'

        if(isMacEndKey) {
            this.lastTab()
            return
        }

        actions?.()
    }

    bindEvents() {
        this.tabsButtonElement.forEach((buttonElement , index) => {
            buttonElement.addEventListener('click' , () => this.onButtonClick(index))
        })
        this.rootElement.addEventListener('keydown' , this.onKeyDown)
    }

}

class TabsCollection {
               constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element)
        })
    }
}

export default TabsCollection