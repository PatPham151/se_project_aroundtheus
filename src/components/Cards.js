export default class Card {
    constructor(
      card,
      cardSelector,
      handleImageClick,
      handleCardLike,
      handleCardDislike,
      handleConfirmPopup
    ) {
      this._name = card.name;
      this._link = card.link;
      this._cardId = card._id;
      
      // Fallback for likes
      this._isLiked = card.likes 
        ? card.likes.some(like => like._id === currentUserId) 
        : false;
      
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
        if (!this._isLiked) {
            this._handleCardLike(this._cardId)
                .then((updatedCard) => {
                    this._likeButton.classList.add('card__like-button--active');
                    this._isLiked = true;
                })
                .catch(err => console.error("Error liking card:", err));
        } else {
            this._handleCardDislike(this._cardId)
                .then((updatedCard) => {
                    this._likeButton.classList.remove('card__like-button--active');
                    this._isLiked = false;
                })
                .catch(err => console.error("Error disliking card:", err));
        }
    }


    #deleteFunction() {
        this._handleConfirmPopup(this._cardId, this._element)
    }


    _setEventListeners() {
        // Like Button functionality 
        this._likeButton.addEventListener("click", () => this.#likeFunction())

        // Delete Button functionality
        this._deleteButton.addEventListener("click", () =>  this.#deleteFunction())
          
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
    
        // Set initial like state
        if (this._isLiked) {
            this._likeButton.classList.add('card__like-button--active');
        }
    
        this._setEventListeners();
    
        return this._element;
    }
}

