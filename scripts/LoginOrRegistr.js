const rootSelector = `[data-js-sign-in]`

class ChangeForm {
    
    selectors = {
        signInBody: `[data-js-sign-in-body]`,
        registrBody: `[data-js-registr-body]`,
        password: `[data-js-sign-in-password]`,
        confirmPassword: `[data-js-sign-in-password-confirm]`,
        passwordDisplay: `[data-js-password-message]`
    }

    stateClasses = {
        isSelected: 'is-selected',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.signInBodyElement = this.rootElement.querySelector(this.selectors.signInBody)
        this.registrBodyElement = this.rootElement.querySelector(this.selectors.registrBody)
        this.passwordElement = this.rootElement.querySelector(this.selectors.password)
        this.confirmPasswordElement = this.rootElement.querySelector(this.selectors.confirmPassword)
        this.passwordDisplayElement = this.rootElement.querySelector(this.selectors.passwordDisplay)

        this.confirmPassword()
        this.changeForm()
        this.bindEvents()
    }

    confirmPassword() {
        if(this.passwordElement.value !== this.confirmPasswordElement.value) {
            alert(`The password is not the same`)
        } 
    }

    passwordMessage() {
        this.passwordDisplayElement.showOpen()

        
    }

    changeForm() {
        const params = new URLSearchParams(window.location.search)
        const formType = params.get('form')
        console.log(formType)
        this.showForm(formType)
    }

    showForm(type) {

        if(type === 'login') {
        this.signInBodyElement.classList.add(this.stateClasses.isSelected)
        }else if(type === 'register') {
        this.registrBodyElement.classList.add(this.stateClasses.isSelected)
        }
    }

    bindEvents() {
        this.confirmPasswordElement.addEventListener('change' , () => this.confirmPassword())
    }

}

class ChangeFormColection {
      constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ChangeForm(element)
        })
    }
}

export default ChangeFormColection