const rootSelector = `[data-js-wishlist]`

class Wishlist  {

    selectors = {
        root: rootSelector,
        addToWishlist: `[data-js-add-to-wishlist]`,
        removeFromWishlist: `[data-js-remove-from-wishlist]`,
        displayWishlist: `[data-js-display-wishlist]`,
        redIconWishlist: `[data-js-wishlist-red-icon]`,
        addToWishlistMessage: `[data-js-add-to-wishlist-message]`,
        removeFromWishlistMessage: `[data-js-remove-wishlist-message]`,
    }

    stateClasses = {
        isActive: 'is-active'
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.addToWishlistElements = this.rootElement.querySelectorAll(this.selectors.addToWishlist)
        this.removeFromWishlistElements = this.rootElement.querySelectorAll(this.selectors.removeFromWishlist)
        this.displayWishlistElement = this.rootElement.querySelector(this.selectors.displayWishlist)
        this.redIconWishlistElement = this.rootElement.querySelector(this.selectors.redIconWishlist)
        this.addToWishlistMessageElement = this.rootElement.querySelector(this.selectors.addToWishlistMessage)
        this.removeFromWishlistMessageElement = this.rootElement.querySelector(this.selectors.removeFromWishlistMessage)
        this.addToWishlistButtonElement = this.rootElement.querySelector('section__popular-card')

        this.wishlist = this.loadStorage()
        this.render()
        this.bindEvents()
    }

    loadStorage() {
        const data = localStorage.getItem("Wishlist")
        return data ? JSON.parse(data) : []
    }

    saveWishlist() {
        localStorage.setItem('Wishlist' , JSON.stringify(this.wishlist))
    }

    isInWishlist(id) {
        return this.wishlist.some(item => parseInt(item.id) === parseInt(id))
    }

    async addToWishlist(id) {
        if(this.isInWishlist(id)) return

        try {
        const response = await fetch('./DataProduct/Product.json')
        const products = await response.json()
        const product = products.find(p => p.id === id)

        if (product) {
            this.wishlist.push(product)
            this.saveWishlist()
            this.render()
        }
    } catch (error) {
        console.error("Failed to fetch product data:", error)
    }
            
    
    this.redIconWishlistElement.classList.add(this.stateClasses.isActive)
   

    this.addToWishlistMessage()
    }

    addToWishlistMessage() {
        this.addToWishlistMessageElement.classList.add(this.stateClasses.isActive)

        setTimeout(() => {
            this.addToWishlistMessageElement.classList.remove(this.stateClasses.isActive)
        }, 1800)
    }

    removeFromWishlist(id) {
        this.wishlist = this.wishlist.filter(p => p.id !== id)
        this.saveWishlist()
        this.render()

        
    this.redIconWishlistElement.classList.remove(this.stateClasses.isActive)

    this.removeFromWishlistMessage()
    }

    
       removeFromWishlistMessage() {
        this.removeFromWishlistMessageElement.classList.add(this.stateClasses.isActive)

        setTimeout(() => {
            this.removeFromWishlistMessageElement.classList.remove(this.stateClasses.isActive)
        }, 1800)
    }

    render() {
        if(!this.displayWishlistElement) return

        if(this.wishlist.length === 0) {
            this.displayWishlistElement.innerHTML = `<p class="wishlist__empty" >Your wishlist is empty.</p>`
            return 
        }

            const html = this.wishlist.map(
                product => `
            <tr class="wishlist__body-inner" data-js-product-wrapper>
                <td class="wishlist__body-product">
                    <img 
                        src="${product.image}" 
                        alt="${product.name}"
                        width="100"
                        height="100"
                        loading="lazy"
                        class="wishlist__body-image"
                    >
                    <span class="wishlist__body-title">${product.name}</span>
                </td>
                <td class="wishlist__body-price">$${product.price.toFixed(2)}</td>
                <td class="wishlist__body-status">
                    <p class="wishlist__body-status-info card card-small card-small--green">${product.status}</p>
                </td>
                <td class="wishlist__body-actions">
                    <button 
                    class="wishlist__body-button button button--green"
                        >Add to Cart</button>
                    <button 
                    class="wishlist__body-button-close button " 
                    aria-label="Remove from wishlist" 
                    title="Remove from wishlist"
                    data-js-remove-from-wishlist
                    data-id="${product.id}"
                    >
                        <svg width="24" height="24" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.75 16.25L16.25 28.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.25 16.25L28.75 28.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
            </tr>`)
           
        .join("")

        
    this.displayWishlistElement.innerHTML = html
    

    this.removeFromWishlistElements = this.rootElement.querySelectorAll(this.selectors.removeFromWishlist)
    this.removeFromWishlistElements.forEach((element) => {
        element.addEventListener('click', (event) => this.onRemoveClick(event))
    })
    }

    onRemoveClick(event) {
        
        const isRemoveButtonElement = event.target.closest(this.selectors.removeFromWishlist)

        if(!isRemoveButtonElement) return

        const id = parseInt(isRemoveButtonElement.dataset.id) 

        this.removeFromWishlist(id)
    }

    onAddClick(event) {
        const isAddButtonElement = event.target.closest(this.selectors.addToWishlist)

        if(!isAddButtonElement) return

        event.preventDefault()

        const id = parseInt(isAddButtonElement.dataset.id)


        if(isNaN(id)) return

      
        this.addToWishlist(id)
    }


    bindEvents() {
        this.addToWishlistElements.forEach((element) => {
            element.addEventListener('click' , (event) => this.onAddClick(event))
        })
    }


}

class WishlistColletion {
       constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Wishlist(element)
        })
    }
}

export default WishlistColletion