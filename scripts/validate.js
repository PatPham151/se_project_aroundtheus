/*---------------------------------------------------------------------------*/
/*---                           Variables                               -----*/
/*---------------------------------------------------------------------------*/

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit",
    inactiveButtonClass: "modal__submit_inactive",
    inputErrorClass: "modal__input_type_error", //changes bottom border to red 
    errorClass: "modal__input-error-active" // span for which error message populates
  };
  
  /*---------------------------------------------------------------------------*/
  /*---                             Utility functions                     -----*/
  /*---------------------------------------------------------------------------*/
  
  function showInputError(formElement, inputElement, errorMessage, config) {
    const errorSelector = `.${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorSelector);
  
    // Show the error message
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  
    // Also apply a red border style (or whatever your CSS does)
    inputElement.classList.add(config.inputErrorClass);
  }
  
  function hideInputError(formElement, inputElement, config) {
    const errorSelector = `.${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorSelector);
  
    // Remove the error message
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
  
    // Remove the error style from the input
    inputElement.classList.remove(config.inputErrorClass);
  }
  

  function hasInvalidInput(inputElements) {
    // returns true if at least one input is invalid
    return inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleSubmitButton(inputElements, buttonElement, config) {
    // If there's an invalid input => disable button
    if (hasInvalidInput(inputElements)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  /*---------------------------------------------------------------------------*/
  /*---                               Logic Functions                     -----*/
  /*---------------------------------------------------------------------------*/
  
  function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  function setEventListeners(formElement, config) {
    const inputElements = [...formElement.querySelectorAll(config.inputSelector)];
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    // Set initial button state
    toggleSubmitButton(inputElements, buttonElement, config);
  
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // Pass config to match the function signatures
        checkInputValidity(formElement, inputElement, config);
        toggleSubmitButton(inputElements, buttonElement, config);
      });
    });
  }
  
  
  function enableValidation(config) { 
    const formElements = [...document.querySelectorAll(config.formSelector)];
  
    formElements.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      setEventListeners(formElement, config);
      // Remove stray 'has' from here
    });
  }
  
  /*---------------------------------------------------------------------------*/
  /*---                             Execution                             -----*/
  /*---------------------------------------------------------------------------*/
  
  enableValidation(config);
  