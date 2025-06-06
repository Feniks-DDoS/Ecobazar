const rootSelector = `[data-js-sign-in]`

class SignIn {
    selectors = {
        regisrtButton: `[data-js-registr-button]`,
        signInButtton: `[data-js-sign-in-button]`,
        signInBody: `[data-js-sign-in-body]`,
        registrBody: `[data-js-registr-body]`,
        signInMenuLink: `[data-js-sign-in-menu-element]`,
        registrMenuLink: `[data-js-registr-menu-element]`,
        signInPassword: `[data-js-sign-in-password]`,
        signInPasswordShowEye: `[data-js-show-password]`,
    }

    stateClasses = {
        isSelected: 'is-selected',
        isActive: 'is-active',
    }


    constructor(rootElement) {
        this.rootElement = rootElement
        this.signInButttonElement = this.rootElement.querySelector(this.selectors.signInButtton)
        this.regisrtButtonElement = this.rootElement.querySelector(this.selectors.regisrtButton)
        this.signInBodyElement = this.rootElement.querySelector(this.selectors.signInBody)
        this.registrBodyElement = this.rootElement.querySelector(this.selectors.registrBody)
        this.signInMenuLinkElement = this.rootElement.querySelector(this.selectors.signInMenuLink)
        this.registrMenuLinkElement = this.rootElement.querySelector(this.selectors.registrMenuLink)
        this.signInPasswordElement = this.rootElement.querySelector(this.selectors.signInPassword)
        this.signInPasswordShowEyeElements = this.rootElement.querySelectorAll(this.selectors.signInPasswordShowEye)

        this.bindEvents()
    }

    onRegistrClick = (event) => {
        event.preventDefault()

        this.signInBodyElement.classList.remove(this.stateClasses.isSelected)
        this.registrBodyElement.classList.add(this.stateClasses.isSelected)

        this.registrMenuLinkElement.classList.add(this.stateClasses.isActive)
        this.signInMenuLinkElement.classList.remove(this.stateClasses.isActive)
    }

    onSignInClick = (event) => {
        event.preventDefault()

        
        this.registrBodyElement.classList.remove(this.stateClasses.isSelected)
        this.signInBodyElement.classList.add(this.stateClasses.isSelected)

        this.signInMenuLinkElement.classList.add(this.stateClasses.isActive)
        this.registrMenuLinkElement.classList.remove(this.stateClasses.isActive)
    }


    onRegistrLinkClick = (event) => {
        event.preventDefault()

        this.signInBodyElement.classList.remove(this.stateClasses.isSelected)
        this.registrBodyElement.classList.add(this.stateClasses.isSelected)

        
        this.registrMenuLinkElement.classList.add(this.stateClasses.isActive)
        this.signInMenuLinkElement.classList.remove(this.stateClasses.isActive)
    }

    onSingInLinkClick = (event) => {
        event.preventDefault()
        
        this.registrBodyElement.classList.remove(this.stateClasses.isSelected)
        this.signInBodyElement.classList.add(this.stateClasses.isSelected)

        
        this.signInMenuLinkElement.classList.add(this.stateClasses.isActive)
        this.registrMenuLinkElement.classList.remove(this.stateClasses.isActive)
    }

    onPasswordShowClick = (event) => {
        const icon = event.currentTarget
        const input = icon.closest('.field').querySelector('input')

        if (input) {
            input.type = input.type === 'password' ? 'text' : 'password'
        }
    }
    bindEvents() {
        this.signInButttonElement.addEventListener('click' , this.onSignInClick)
        this.regisrtButtonElement.addEventListener('click' , this.onRegistrClick)
        this.signInMenuLinkElement.addEventListener('click' , this.onSingInLinkClick)
        this.registrMenuLinkElement.addEventListener('click' , this.onRegistrLinkClick)
        this.signInPasswordShowEyeElements.forEach((element) => {
            element.addEventListener('click' , this.onPasswordShowClick)
        })
    }
}

class SignInCollection {
          constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new SignIn(element)
        })
    }
}


export default SignInCollection