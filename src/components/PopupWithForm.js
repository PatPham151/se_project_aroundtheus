import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = [...this._form.querySelectorAll(".modal__input")];
    this._submitButton = this._form.querySelector(".modal__submit");
  }

  // Gathers form input values as an object
  _getInputValues() {
    return this._inputList.reduce((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  // Override `setEventListeners()` to add form submission handling
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
  
}
