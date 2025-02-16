export default class FormValidator {
  constructor(config, formElement) {
      this._config = config;
      this._formElement = formElement;
      this._inputElements = [...this._formElement.querySelectorAll(this._config.inputSelector)];
      this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
      const errorSelector = `.${inputElement.id}-error`;
      const errorElement = this._formElement.querySelector(errorSelector);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
      inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
      const errorSelector = `.${inputElement.id}-error`;
      const errorElement = this._formElement.querySelector(errorSelector);
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
      inputElement.classList.remove(this._config.inputErrorClass);
  }

  _hasInvalidInput() {
      return this._inputElements.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleSubmitButton() {
      if (this._hasInvalidInput()) {
          this._buttonElement.classList.add(this._config.inactiveButtonClass);
          this._buttonElement.disabled = true;
      } else {
          this._buttonElement.classList.remove(this._config.inactiveButtonClass);
          this._buttonElement.disabled = false;
      }
  }

  resetValidation() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    if (!this._hasInvalidInput()) {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false; 
  } else {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true; 
  }
  }

  _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
      } else {
          this._hideInputError(inputElement);
      }
  }

  _setEventListeners() {
      this._toggleSubmitButton();
      this._inputElements.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleSubmitButton();
          });
      });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    this._setEventListeners();
}

}
