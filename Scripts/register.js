class FormsValidation {
    constructor(dataAtribute) {
        this.form = document.querySelector(dataAtribute)

        this.bindEvents();
    }
    errorMessageVariation = {
        valueMissing: () => 'Заполните это поле',
        patternMismatch: ({title}) => title || 'Данные не соответствуют формату',
        tooShort: ({minLength}) => `Минимальное количество символов - ${minLength}`,
        tooLong: ({maxLength}) => `Максимальное количество символов - ${maxLength}`,
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

        Object.entries(this.errorMessageVariation)
        .forEach(([errorType, getErrorMessage]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldInputElement))
            }
        })
        this.manageErrors(fieldInputElement, errorMessages)
        const isValid = errorMessages.length === 0

        fieldInputElement.ariaInvalid = !isValid
        
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
        }
        
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
