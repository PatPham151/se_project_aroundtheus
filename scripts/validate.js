/*---------------------------------------------------------------------------*/
/*---                           Variables                               -----*/
/*---------------------------------------------------------------------------*/

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit",
    inactiveButtonClass: "modal__submit_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__input_error" // removed the leading dot
  };
  
  /*---------------------------------------------------------------------------*/
  /*---                             Utility functions                     -----*/
  /*---------------------------------------------------------------------------*/
  
  function showInputError(formElement, inputElement, errorMessage) {
    const errorSelector = `.${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorSelector);
  
    // Show the error message
    errorElement.textContent = errorMessage;
    errorElement.classList.add("modal__input_error_active");
  
    // Also apply a red border style (or whatever your CSS does)
    inputElement.classList.add(config.inputErrorClass);
  }
  
  function hideInputError(formElement, inputElement) {
    const errorSelector = `.${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorSelector);
  
    // Remove the error message
    errorElement.textContent = "";
    errorElement.classList.remove("modal__input_error_active");
  
    // Remove the error style from the input
    inputElement.classList.remove(config.inputErrorClass);
  }
  
  // Instead of "hasValidInputForSubmit", let's name it "hasInvalidInput" for clarity
  function hasInvalidInput(inputElements) {
    // returns true if at least one input is invalid
    return inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleSubmitButton(inputElements, buttonElement) {
    // If there's an invalid input => disable button
    if (hasInvalidInput(inputElements)) {
      buttonElement.classList.add("modal__submit_inactive");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove("modal__submit_inactive");
      buttonElement.disabled = false;
    }
  }
  
  /*---------------------------------------------------------------------------*/
  /*---                               Logic Functions                     -----*/
  /*---------------------------------------------------------------------------*/
  
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  function setEventListeners(formElement, config) {
    const inputElements = [...formElement.querySelectorAll(config.inputSelector)];
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    // Set initial button state (if any fields are invalid on load)
    toggleSubmitButton(inputElements, buttonElement);
  
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement);
        toggleSubmitButton(inputElements, buttonElement);
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
  