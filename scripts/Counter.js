const rootSelector = `[data-js-counter]`

class Counter {

    selectors = {
        root: rootSelector,
        upButton: `[data-js-counter-up-button]`,
        downButton: `[data-js-counter-down-button]`,
        displayCounter: `[data-js-counter-display]`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement,
        this.upButtonElement = this.rootElement.querySelector(this.selectors.upButton)
        this.downButtonElement = this.rootElement.querySelector(this.selectors.downButton)
        this.displayCounterElement = this.rootElement.querySelector(this.selectors.displayCounter)

        this.count = 0
        this.bindEvents()
    }

    onUpClick = () => {
        this.count++

        this.displayCounterElement.textContent = this.count
    }

    onDownClick = () => {
      this.count--

    if(this.count < 0) {
        this.count = 0
    }

    this.displayCounterElement.textContent = this.count

    }

    bindEvents() {
        this.upButtonElement.addEventListener('click' , this.onUpClick)
        this.downButtonElement.addEventListener('click' , this.onDownClick)
    }
}

class CounterCollection {
      constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Counter(element)
        })
    }
}

export default CounterCollection