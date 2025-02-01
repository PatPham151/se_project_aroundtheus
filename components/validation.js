export default class FormValidator {
    constructor(config) {
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
    }
  
    _showInputError(formElement, inputElement, errorMessage) {
      const errorSelector = `.${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorSelector);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
      inputElement.classList.add(this._inputErrorClass);
    }
  
    _hideInputError(formElement, inputElement) {
      const errorSelector = `.${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorSelector);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
      inputElement.classList.remove(this._inputErrorClass);
    }
  
    _hasInvalidInput(inputElements) {
      return inputElements.some((inputElement) => !inputElement.validity.valid);
    }
  
    _toggleSubmitButton(inputElements, buttonElement) {
      if (this._hasInvalidInput(inputElements)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    }
  
    _checkInputValidity(formElement, inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(formElement, inputElement);
      }
    }
  
    _setEventListeners(formElement) {
      const inputElements = [...formElement.querySelectorAll(this._inputSelector)];
      const buttonElement = formElement.querySelector(this._submitButtonSelector);
      this._toggleSubmitButton(inputElements, buttonElement);
  
      inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(formElement, inputElement);
          this._toggleSubmitButton(inputElements, buttonElement);
        });
      });
    }
  
    enableValidation() {
      const formElements = [...document.querySelectorAll(this._formSelector)];
      formElements.forEach((formElement) => {
        formElement.addEventListener("submit", (e) => e.preventDefault());
        this._setEventListeners(formElement);
      });
    }
  }
  