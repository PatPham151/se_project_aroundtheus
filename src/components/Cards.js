export default class Card {
    constructor(
      card,
      cardSelector,
      handleImageClick,
      handleCardLike,
      handleCardDislike,
      handleConfirmPopup,
    
    ) {
      this._name = card.name;
      this._link = card.link;
      this._cardId = card._id;
      this._cardSelector = cardSelector;
      this._handleImageClick = handleImageClick;
      this._handleCardLike = handleCardLike;
      this._handleCardDislike = handleCardDislike;
      this._handleConfirmPopup = handleConfirmPopup;

    }

    // The constructor needs initialCards array and '#card_template' for cardSelector
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    #likeFunction() { 
        if (!this._likeButton.classList.contains('card__like-button--active')) {
        this._handleCardLike(this._cardId)
        this._likeButton.classList.add('card__like-button--active');
        } else {
        this._handleCardDislike(this._cardId)
        this._likeButton.classList.remove('card__like-button--active');
        }
    }

    deleteFunction() {
        this._handleDeleteClick(this._cardId)
        this._element.remove();
    }


    _setEventListeners() {
        // Like Button functionality 
        this._likeButton.addEventListener("click", () => this.#likeFunction())

        // Delete Button functionality
        this._deleteButton.addEventListener("click", () => {
            this._handleConfirmPopup(this);
          });
        // Picture modal functionality
        this._imageElement.addEventListener("click", () => {
            this._handleImageClick({ name: this._name, link: this._link });
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector(".card__image");
        this._element.querySelector(".card__title").textContent = this._name;
    
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
    
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete");
    
        
        this._setEventListeners();
    
        return this._element;
    }
}
