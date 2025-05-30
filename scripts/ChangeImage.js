const rootSelector = `[data-js-quick-view-wrapper]`

class ChangeImage {

    selectors = {
        root: rootSelector,
        upChangeButton: `[data-js-quick-view-up-button]`,
        downChangeButton: `[data-js-quick-view-down-button]`,
        changeImages: `[data-js-quick-view-small-image]`,
        changeMainImage: `[data-js-quick-view-main-image]`,
    }

    stateClasses = {
        isActive: 'is-active'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.upChangeButtonElement = this.rootElement.querySelector(this.selectors.upChangeButton)
        this.downChangeButtonElement = this.rootElement.querySelector(this.selectors.downChangeButton)
        this.changeImagesElements = this.rootElement.querySelectorAll(this.selectors.changeImages)
        this.changeMainImageElement = this.rootElement.querySelector(this.selectors.changeMainImage)

        this.bindEvents()
    }



    changeMainImage(imageElement) {
    const newSrc = imageElement.getAttribute('src');
    this.changeMainImageElement.setAttribute('src', newSrc);

        this.changeImagesElements.forEach((image) => {
            image.classList.remove(this.stateClasses.isActive)
        })

        imageElement.classList.add(this.stateClasses.isActive)
    }

    onChangeImageClick(event) {

        const { target } = event

        const isImage = target.matches(this.selectors.changeImages)

        if(!isImage) return

        this.changeMainImage(target)
    }

    onUpChangeClick(event) {
        const isUpChangeButton = event.target.matches(this.selectors.upChangeButton)

        if(!isUpChangeButton) return

        
        let currentIndex = [...this.changeImagesElements].findIndex(image => image.classList.contains(this.stateClasses.isActive))

        let newIndex = currentIndex - 1
        if(newIndex < 0) {
            newIndex = this.changeImagesElements.length - 1
        }

        this.changeMainImage(this.changeImagesElements[newIndex])

    }

    onDownChangeClick(event) {
        const isDownChangeButton = event.target.matches(this.selectors.downChangeButton)

        if(!isDownChangeButton) return

        
        let currentIndex = [...this.changeImagesElements].findIndex(image => image.classList.contains(this.stateClasses.isActive))

        if(currentIndex === -1) currentIndex = 0

        let newIndex = currentIndex + 1
        if(newIndex >= this.changeImagesElements.length) {
            newIndex = 0
        }

        this.changeMainImage(this.changeImagesElements[newIndex])

    }
    bindEvents() {
        this.upChangeButtonElement.addEventListener('click' , (event) => this.onUpChangeClick(event))
        this.downChangeButtonElement.addEventListener('click' , (event) => this.onDownChangeClick(event))
        this.changeImagesElements.forEach((image) => {
            image.addEventListener('click', (event) => this.onChangeImageClick(event))
        })
    }
}

class ChangeImageCollection {
         constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ChangeImage(element)
        })
    }
}

export default ChangeImageCollection