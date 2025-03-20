import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._submitButton = this._popup.querySelector(".modal__submit");
  }

  setSubmitFunction(submitFn) {
    this._handleSubmit = submitFn;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      this._handleSubmit(); // Calls the delete function
    });
  }
}