const rootSelector = `[data-js-filter]`

class ShowFilter {
    selectors = {
        root: rootSelector,
        showButton: `[data-js-filter-show]`,
        filterBody: `[data-js-filter-body]`,
        tagButton: `[data-js-tag-button]`,

    }

    stateClasses = {
        isActive: 'is-active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.showButtonElement = this.rootElement.querySelector(this.selectors.showButton)
        this.filterBodyElement = this.rootElement.querySelector(this.selectors.filterBody)
        this.tagButtonElement = this.rootElement.querySelectorAll(this.selectors.tagButton)

        this.bindEvents()
    }


    onShowClick = () => {
        this.filterBodyElement.classList.toggle(this.stateClasses.isActive)
        this.showButtonElement.classList.toggle(this.stateClasses.isActive)
    }



    bindEvents() {
        this.showButtonElement.addEventListener('click' , this.onShowClick)
        this.tagButtonElement.forEach((element) => {
            element.addEventListener('click' , () => {
                element.classList.toggle(this.stateClasses.isActive)
            })
        })
    }
}

class ShowFilterCollection {
      constructor() {
    this.init()
  }

   init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ShowFilter(element)
        })
    }
}

export default ShowFilterCollection