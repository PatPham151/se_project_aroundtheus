import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = null;
    this._submitButton = this._popup.querySelector(".modal__confirmation_submit");
  }
  
  setSubmitFunction(handleConfirm) {
    this._handleSubmit = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", () => {
      this._handleSubmit(); // Calls the delete function
    });
  }
}