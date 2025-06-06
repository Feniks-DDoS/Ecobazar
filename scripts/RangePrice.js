const rootSelector = `[data-js-range-price]`


class RangePrice {
    selectors = {
        root: rootSelector,
        minPriceDisplay: `[data-js-range-min-price-display]`,
        maxPriceDisplay: `[data-js-range-max-price-display]`,
        minPriceRangeButton: `[data-js-min-range-price]`,
        maxPriceRangeButton: `[data-js-max-range-price]`,
        rangeLine: `[data-js-range-line]`,
    }


    constructor(rootElement) {
        this.rootElement = rootElement,
        this.minPriceDisplayElement = this.rootElement.querySelector(this.selectors.minPriceDisplay)
        this.maxPriceDisplayElement = this.rootElement.querySelector(this.selectors.maxPriceDisplay)
        this.minPriceRangeButtonElement = this.rootElement.querySelector(this.selectors.minPriceRangeButton)
        this.maxPriceRangeButtonElement = this.rootElement.querySelector(this.selectors.maxPriceRangeButton)
        this.rangeLineElement = this.rootElement.querySelector(this.selectors.rangeLine)
        
        this.updatePrice()
        this.bindEvents()

    }

    updatePrice = () => {
        this.minValue = parseInt(this.minPriceRangeButtonElement.value)
        this.maxValue = parseInt(this.maxPriceRangeButtonElement.value)

        if(this.minValue > this.maxValue) {
            [this.minValue , this.maxValue] = [this.maxValue, this.minValue] 
        }

        this.minPriceDisplayElement.textContent = this.minValue
        this.maxPriceDisplayElement.textContent = this.maxValue


        const min = this.minPriceRangeButtonElement.min
        const max = this.maxPriceRangeButtonElement.max

        const rangeLine = max - min

        const leftSide = ((this.minValue - min) / rangeLine ) * 100
        const rightSide = ((this.maxValue - min) / rangeLine) * 100

        this.rangeLineElement.style.left = `${leftSide}%`
        this.rangeLineElement.style.width = `${rightSide - leftSide}%`
    }

    bindEvents() {
        this.maxPriceRangeButtonElement.addEventListener('input' , this.updatePrice)
        this.minPriceRangeButtonElement.addEventListener('input' , this.updatePrice)
    }
}

class RangePriceCollection {
        constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new RangePrice(element)
        })
    }
}

export default RangePriceCollection