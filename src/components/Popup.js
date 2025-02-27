export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Open modal
  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Close modal
  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Handles closing modal with "Escape" key
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  // Sets event listeners (Only runs once)
  setEventListeners() {
    if (!this._popup) {
      console.error("Popup element not found:", this._popup);
      return;
    }

    // Close when clicking outside (ONLY on overlay, NOT inside modal)
    this._popup.addEventListener("mousedown", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });

    // Close when clicking the close button
    const closeButton = this._popup.querySelector(".modal__close");
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    } else {
      console.warn(`No close button found inside ${this._popup.id}`);
    }
  }
}

  
  


