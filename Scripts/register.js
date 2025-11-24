class FormsValidation {
    constructor(dataAtribute) {
        this.form = document.querySelector(dataAtribute)

        this.bindEvents();
    }
    errorMessageVariation = {
        valueMissing: ({name}) => {
            if (name === 'agreement') {
                return 'You must agree to the terms'
            } else {
                return 'This field is required'
            }
        },
        patternMismatch: ({title}) => title || 'Please enter a valid value.',
        tooShort: ({minLength}) => `The value must be at least ${minLength} characters long`,
        tooLong: ({maxLength}) => `The value cannot exceed ${maxLength} characters`,
        customError: () => 'Passwords do not match'
    }
    manageErrors(fieldInputElement, errorMessages) {
        const errorsFieldElement = 
        fieldInputElement.parentElement.querySelector('[data-form-errors-field]')

        errorsFieldElement.innerHTML = errorMessages
        .map((message) => `<span class="error-field">${message}</span>`)
        .join('')
    }
    validateField(fieldInputElement) {
        const errors = fieldInputElement.validity
        
        const errorMessages = []

        if (fieldInputElement.name === 'passwordConfirm') {
            if (this.form.password.value ===
                fieldInputElement.value) {
                    fieldInputElement.setCustomValidity('')
                } else {
                    fieldInputElement.setCustomValidity('Passwords do not match')
                }
        }
        Object.entries(this.errorMessageVariation)
        .forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldInputElement))
            }
        })
        
        this.manageErrors(fieldInputElement, errorMessages)
        const isValid = errorMessages.length === 0

        fieldInputElement.setAttribute('aria-invalid', !isValid)
        
        fieldInputElement.classList.toggle('invalid', !isValid)
        
        return isValid
    }
    onSubmit(e) {
        const requiredInputElements = [...this.form.elements]
        .filter(({required}) => required)
        
        let isFormValid = true
        let firstInvalidFieldInput = null

        requiredInputElements.forEach((element) => {
            const isFieldValid = this.validateField(element)

            if (!isFieldValid) {
                isFormValid = false

                if (!firstInvalidFieldInput) {
                    firstInvalidFieldInput = element
                }
            }
        })
        if (!isFormValid) {
            e.preventDefault()
            firstInvalidFieldInput.focus()
        } else {
            e.preventDefault()
            this.saveData()
        }
        
    }
    saveData() {
        const data = Object.fromEntries(new FormData(this.form))
        localStorage.setItem('userData', JSON.stringify(data))
        window.location = '/'
    }
    onChange(e) {
        const isToggleType = ['radio', 'checkbox'].includes(e.target.type)

        if (e.target.required && isToggleType) {
            this.validateField(e.target)
        }
    }
    onBlur(e) {
        if (e.target.required) {
          this.validateField(e.target)
        }
    }
    bindEvents() {
        this.form.addEventListener('blur', (e) => this.onBlur(e), true)
        this.form.addEventListener('change', (e) => this.onChange(e))
        this.form.addEventListener('submit', (e) => this.onSubmit(e))
    } 
}
new FormsValidation('[data-form]')
class FormSessionSave {
    constructor(form) {
        this.form = document.querySelector(`${form}`)
        this.formInputs = this.form.querySelectorAll(`[data-form-input]`)

        this.sessionCheck()
        this.bindInputEvent()
    }
    sessionCheck() {
        this.formInputs.forEach((input) => {
            const inputValue = sessionStorage.getItem(`${this.form.id}-${input.name}`)
            if (inputValue !== null) {
                input.value = inputValue
            }
        })
    }
    bindInputEvent() {
        this.formInputs.forEach((input) => {
            input.addEventListener('change', () => {
                sessionStorage.setItem(`${this.form.id}-${input.name}`, input.value)
            })
        })
    }
}
new FormSessionSave('[data-form]')

