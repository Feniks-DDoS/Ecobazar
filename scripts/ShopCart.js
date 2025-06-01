const rootSelector = `[data-js-shop-cart]`

class ShopCart {

    selectors = {
        root: rootSelector,
        addToShopCart: `[data-js-add-to-shop-cart]`,
        removeFromShopCart: `[data-js-remove-from-shop-cart]`,
        removeFromShopCartAll: `[data-js-shop-cart-remove-all]`,
        displayShopCart: `[data-js-display-shop-cart]`,
        counterUpButton: `[data-js-counter-up-button]`,
        counterDownButton: `[data-js-counter-down-button]`,
        totalPrice: `[data-js-shop-cart-total]`,
        headerTotalPrice: `[data-js-header-total-price]`,
        headerProductCounter: `[data-js-header-product-counter]`,
    }

    stateClasses = {
        isActive: 'is-active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.addToShopCartElement = this.rootElement.querySelectorAll(this.selectors.addToShopCart)
        this.displayShopCartElement = this.rootElement.querySelector(this.selectors.displayShopCart)
        this.removeFromShopCartAllElement = this.rootElement.querySelector(this.selectors.removeFromShopCartAll)
        this.headerTotalPriceElement = this.rootElement.querySelectorAll(this.selectors.headerTotalPrice)
        this.headerProductCounterElement = this.rootElement.querySelectorAll(this.selectors.headerProductCounter)


        this.shopCart = this.loadStorage()
        this.updateProductCart()
        this.updateAllPrice()
        this.render()
        this.bindEvents()
    }

    loadStorage() {
        const data = localStorage.getItem("Shop-cart")
        const savedTotal = localStorage.getItem("Shop-cart-total")

        this.totalPrice = savedTotal ? parseFloat(savedTotal) : 0


        return data ? JSON.parse(data) : []
    }

    saveShopCart() {
        localStorage.setItem("Shop-cart" , JSON.stringify(this.shopCart))
    }

    saveTotalPrice() {
        this.totalPrice = this.shopCart.reduce((sum , product) => {
            return sum + product.price * product.quantity
        }, 0)

        localStorage.setItem('Shop-cart-total' , this.totalPrice.toFixed(2))
    }

    isInShopCart(id) {
        return this.shopCart.some(item => parseInt(item.id) === parseInt(id))
    }

    async addToShopCart(id) {
        const existingItem = this.shopCart.find(item => parseInt(item.id) === parseInt(id))

        if(existingItem) {
            existingItem.quantity += 1
            this.saveShopCart()
            this.saveTotalPrice()
            this.render()
            this.updateAllPrice()
            alert('Product quantity increased in shop cart')
            return
        }
     
        
        try {
            const response = await fetch('./DataProduct/Product.json')
            const products = await response.json()
            const product = products.find(p => p.id === id)

            if(product) {
                product.quantity = 1
                this.shopCart.push(product)
                this.saveShopCart()
                this.saveTotalPrice()
                this.updateProductCart()
                this.render()
                this.updateAllPrice()
            alert('Product added to shop cart')
            }
        }catch(error) {
            console.error("Failed to fetch product data:", error)
        }
    }

    removeFromShopCart(id) {
        this.shopCart = this.shopCart.filter(p => p.id !== id)
        this.saveShopCart()
        this.saveTotalPrice()
        this.updateProductCart()
        this.render()
        this.updateAllPrice()
    }

    removeAllFromShopCart() {
        this.shopCart = []
        this.saveShopCart()
        this.saveTotalPrice()
        this.updateProductCart()
        this.render()
        this.updateAllPrice()
        alert('Shop cart cleaned')
    }

    render() {

        
        this.totalPriceElement = this.rootElement.querySelectorAll(this.selectors.totalPrice)

        if(!this.displayShopCartElement) return

        if(this.shopCart.length === 0) {
            this.displayShopCartElement.innerHTML =  `<p class="shop-cart__empty" >Your shop cart is empty.</p>`

              this.updateAllPrice()
              return
        }

        const html = this.shopCart.map (product => `
                                        <tr class="shop-cart__body-inner" data-js-display-shop-cart>
                                <td class="shop-cart__body-product">
                                    <img 
                                        src="${product.image}" 
                                        alt="${product.name}"
                                        width="100"
                                        height="100"
                                        loading="lazy"
                                        class="shop-cart__body-image"
                                    >
                                    <span class="shop-cart__body-title">${product.name}</span>
                                </td>
                                <td class="shop-cart__body-price">
                                    $${product.price.toFixed(2)}
                                </td>
                                <td class="shop-cart__body-quantity">
                                    <div class="counter">
                                        <button class="counter__button" aria-label="Reduce the number of" type="button" data-js-counter-down-button>-</button>
                                        <span class="counter__display">${product.quantity}</span>
                                        <button class="counter__button" aria-label="Increase the number" type="button" data-js-counter-up-button>+</button>
                                    </div>
                                </td>
                                <td class="shop-cart__body-subtotal">
                                     $${(product.price * product.quantity).toFixed(2)}
                                    <button 
                                    class="shop-cart__body-button-close button " 
                                    aria-label="Remove from shop cart" 
                                    title="Remove from shop cart"
                                    data-js-remove-from-shop-cart
                                    data-id="${product.id}"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M28.75 16.25L16.25 28.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M16.25 16.25L28.75 28.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
            `)

            this.displayShopCartElement.innerHTML = html

        this.totalPriceElement = this.rootElement.querySelectorAll(this.selectors.totalPrice)
            
        this.counterUpButtonElement = this.rootElement.querySelectorAll(this.selectors.counterUpButton)
        this.counterDownButtonElement = this.rootElement.querySelectorAll(this.selectors.counterDownButton)

        this.updateAllPrice()

            this.counterUpButtonElement.forEach(button => {
                button.addEventListener('click' , (event) => {
                    const row = event.target.closest(this.selectors.displayShopCart)
                    const id = parseInt(row.querySelector(`[data-js-remove-from-shop-cart]`).dataset.id)
                    this.increaseQuantity(id)
                })
            })

            this.counterDownButtonElement.forEach(button => {
                button.addEventListener('click' , (event) => {
                    const row = event.target.closest(this.selectors.displayShopCart)
                    const id = parseInt(row.querySelector(`[data-js-remove-from-shop-cart]`).dataset.id)
                    this.decreaseQuantity(id)
                })
            })

            this.removeFromShopCartElement = this.rootElement.querySelectorAll(this.selectors.removeFromShopCart)
            this.removeFromShopCartElement.forEach((element) => {
                element.addEventListener('click' , (event) => this.onRemoveClick(event))
            })
    }


    updateProductCart() {
        const count = this.shopCart.reduce((sum , product ) => sum + product.quantity, 0)
        localStorage.setItem('cartCount' , count)

        this.headerProductCounterElement.forEach(element => {
            element.textContent = count
        })
    }
   
    

    updateAllPrice() {
        this.totalPrice = this.shopCart.reduce((sum , product) => {
            return sum + product.price * product.quantity
        }, 0)

        
        localStorage.setItem('Shop-cart-total' , this.totalPrice.toFixed(2))


        if(this.totalPriceElement?.length) {
        this.totalPriceElement.forEach(element => {
            element.textContent = this.totalPrice.toFixed(2)
        }) 
    }

      if(this.headerTotalPriceElement?.length) {
        this.headerTotalPriceElement.forEach(element => {
            element.textContent = this.totalPrice.toFixed(2)
        })
    }

    
    }

    increaseQuantity(id) {
        const product = this.shopCart.find(p => p.id === id)
        if(product) {
            product.quantity += 1
            this.saveShopCart()
            this.saveTotalPrice()
            this.updateProductCart()
            this.render()
        }
    }

    decreaseQuantity(id) {
        const product = this.shopCart.find(p => p.id === id)
        if(product) {
            if( product && product.quantity === 1) {
            this.removeFromShopCart(id)
        }else {
            product.quantity -= 1
            this.saveShopCart()
            this.saveTotalPrice()
            this.updateProductCart()
            this.render()
        }
        }
    }

    onRemoveClick(event) {
        const isRemoveButtonElement = event.target.closest(this.selectors.removeFromShopCart)

        if(!isRemoveButtonElement) return

        const id = parseInt(isRemoveButtonElement.dataset.id)

        this.removeFromShopCart(id)
    }

    onRemoveAllClick(event) {
        const isRemoveAllButton = event.target.closest(this.selectors.removeFromShopCartAll)

        if(!isRemoveAllButton) return

        this.removeAllFromShopCart()

    }

    onAddClick(event) {
        const isAddButtonElement = event.target.closest(this.selectors.addToShopCart)

        if(!isAddButtonElement) return

        event.preventDefault()

        const id = parseInt(isAddButtonElement.dataset.id)

        if(isNaN(id)) return

        this.addToShopCart(id)
    }

    bindEvents() {
        this.addToShopCartElement.forEach((element) => {
            element.addEventListener('click' , (event) => this.onAddClick(event))
        })
        this.removeFromShopCartAllElement.addEventListener('click' , (event) => this.onRemoveAllClick(event))
    }

}

class ShopCartCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ShopCart(element)
        })
    }
}


export default ShopCartCollection