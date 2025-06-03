const rootSelector = `[data-js-form]`


class FormValidate {

    selectors = {
        form: rootSelector,
        errorMessage: `[data-js-form-errors]`,
    }

    errorMessages = {
        minLength: ({ minLength }) => `Min character ${minLength}`,
        maxLength: ({ maxLength }) => `Max character ${maxLength}`,
        valueMissing: () => `Incorrect value`,
        patternMismatch: ({ title }) => title || `Incorrect value`,
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.bindEvents()
    }

    manageErorrs(fieldControlElement , erorrMessages) {
        const fieldErrorElement = fieldControlElement.parentElement.querySelector(this.selectors.errorMessage)

        fieldErrorElement.innerHTML = erorrMessages
        .map((message) => `<span class="field__erorrs">${message}</span>`)
        .join('')
    }

    validate(fieldControlElement) {
        const error = fieldControlElement.validity

        const errorMessages = []

        Object.entries(this.errorMessages).forEach(([erorrType , getMessage]) => {
            if(error[erorrType]) {
                 errorMessages.push(getMessage(fieldControlElement))
            } 
        })

        this.manageErorrs(fieldControlElement , errorMessages)

        const isValid = errorMessages.length === 0

        fieldControlElement.ariaInvalid = !isValid

        return isValid
    }

    onBlur(event) {
        const { target } = event

        const isFormElement = target.closest(this.selectors.form)
        const isRequired = target.required

        if(isFormElement && isRequired) {
            this.validate(target)
        }

    }

    onChange(event) {

        const { target } = event

        const isRequired = target.required
        const isToggleType = ['checkbox' , 'radio'].includes(target.type)

        if(isToggleType && isRequired) {
            this.validate(target)
        }

        
     }

    onSubmit(event) {
        const isFormElement = event.target.matches(this.selectors.form)

        if(!isFormElement) return

        const isAllRequired = [...event.target.elements].filter(({required}) => required)

        let isFormValid = true
        let firstInvalidElement = null

        isAllRequired.forEach((element) => {
            const isFieldValid = this.validate(element)

            if(!isFieldValid) {
                isFormValid = false
                
                if(!firstInvalidElement) {
                    firstInvalidElement = element
                }
            }
        })

        if(!isFormValid) {
            event.preventDefault()
            firstInvalidElement.focus()
        }
    }


    bindEvents() {
        document.addEventListener('blur', (event) => {
            this.onBlur(event)
        }, true),
        document.addEventListener('change' , (event) => this.onChange(event))
        document.addEventListener('submit', (event) => this.onSubmit(event))
    }

}

class FormValidateCollection {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new FormValidate(element)
        })
    }
}


export default FormValidateCollection