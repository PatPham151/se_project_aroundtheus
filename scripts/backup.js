/*---------------------------------------------------------------------------*/
/*---                           Variables                               -----*/
/*---------------------------------------------------------------------------*/

const nameInput = formElement.querySelector('.modal__input');





/*---------------------------------------------------------------------------*/
/*---                             Utility functions                     -----*/
/*---------------------------------------------------------------------------*/

//-------Show & Hide Errors 

const formElement = document.querySelector('.modal__form');
const nameInput = formElement.querySelector('.modal__input');

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    inputElement.classList.add('modal__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('modal__input_error_active');
  } else {
    inputElement.classList.remove('modal__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('modal__input_error_active');
  }
};

nameInput.addEventListener('input', () => showInputError(formElement, nameInput));



/*---------------------------------------------------------------------------*/
/*---                               Logic Functions                     -----*/
/*---------------------------------------------------------------------------*/







/*---------------------------------------------------------------------------*/
/*---                             Execution                             -----*/
/*---------------------------------------------------------------------------*/
