const rootSelector = `[data-js-sign-in]`

class ChangeForm {
    
    selectors = {
        signInBody: `[data-js-sign-in-body]`,
        registrBody: `[data-js-registr-body]`,
    }

    stateClasses = {
        isSelected: 'is-selected',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.signInBodyElement = this.rootElement.querySelector(this.selectors.signInBody)
        this.registrBodyElement = this.rootElement.querySelector(this.selectors.registrBody)

        this.changeForm()
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