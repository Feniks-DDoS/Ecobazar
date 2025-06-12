const rootSelector = `[data-js-slider]`

class ShopSlider {
    selectors = {
        root: rootSelector,
        sliderWrapper: `[ data-js-slider-wrapper]`,
        prevButton: `[data-js-slider-button-prev]`,
        nextButton: `[data-js-slider-button-next]`,
        pagination: `[data-js-slider-button]`
    }

    stateClasses = {
        isActive: 'is-active'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.prevButtonElement = this.rootElement.querySelector(this.selectors.prevButton)
        this.nextButtonElement = this.rootElement.querySelector(this.selectors.nextButton)
        this.paginationElement = this.rootElement.querySelectorAll(this.selectors.pagination)
        this.sliderWrapperElement = this.rootElement.querySelector(this.selectors.sliderWrapper)

        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.products = Array.from(document.querySelectorAll('.section__popular-item'));
        this.currentPage = 1
        this.itemsPerPage = 13
        this.bindEvents()    
        this.showPage(this.currentPage);
        this.setActiveButton(this.currentPage);
        this.updateArrowState();
    }
    showPage(pageNumber) {
        const start = (pageNumber - 1) * this.itemsPerPage
        const end = start + this.itemsPerPage

        this.products.forEach((product , index) => {
            product.style.display = (index >= start && index < end) ? 'block' : 'none';
        })
    }

    onPaginationClick(index) {
        this.currentPage = index + 1
        this.showPage(this.currentPage)
        this.setActiveButton(this.currentPage)
        this.updateArrowState()
    }

    setActiveButton(pageNumber) {
        this.paginationElement.forEach(button => button.classList.remove(this.stateClasses.isActive))
        this.paginationElement[pageNumber - 1]?.classList.add(this.stateClasses.isActive)
    }

    onPrevClick() {
        if(this.currentPage > 1) {
            this.currentPage--
            this.showPage(this.currentPage)
            this.setActiveButton(this.currentPage)
            this.updateArrowState()
        }
    }

    onNextClick() {
        if(this.currentPage < this.paginationElement.length) {
            this.currentPage++
            this.showPage(this.currentPage)
            this.setActiveButton(this.currentPage)
            this.updateArrowState()

        }
    }

    updateArrowState() {
        this.prevButtonElement.disabled = this.currentPage === 1
        this.nextButtonElement.disabled = this.currentPage === this.paginationElement.length 
    }

    bindEvents() {
        this.nextButtonElement?.addEventListener('click' , this.onNextClick)
        this.prevButtonElement?.addEventListener('click' , this.onPrevClick)
        this.paginationElement.forEach((button , index) => {
            button.addEventListener('click' ,() => this.onPaginationClick(index))
        })
    }
}

class ShopSliderCollection {      
     constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ShopSlider(element)
        })
}}


export default ShopSliderCollection
