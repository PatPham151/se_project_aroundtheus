const initialCards = [
    { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
    { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
    { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
    { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
    { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
    { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
  ];
  
  const cardList = document.querySelector('.gallery__cards');
  const cardTemplate = document.querySelector('#card__template').content.firstElementChild;
  
  const modal = document.querySelector('.modal');
  const profileEditBtn = document.getElementById('profile__edit-button');
  const profileEditCloseBtn = document.querySelector('.modal__close');
  const modalForm = document.querySelector('.modal__form');
  const profileExistingName = document.querySelector('.profile__title');
  const profileExistingDesc = document.querySelector('.profile__description');
  const profileNameInput = document.querySelector("[name='title']");
  const profileDescInput = document.querySelector("[name='about']");
  
  const addModal = document.querySelector('.add__modal');
  const addModalClose = document.querySelector('.add__modal_close');
  const addModalForm = document.querySelector('.add__modal_form');
  const addModalOpenBtn = document.querySelector('.profile__add-button');
  
  const cardImageModal = document.querySelector('.picture__modal');
  const cardImageModalCloseBtn = document.querySelector('.picture__container_close');
  const cardImageModalImg = document.querySelector('.picture__modal_image');
  
  // <---------       Event Listeners       ----------->
  
  // Profile Modal Event Listeners
  profileEditBtn.addEventListener('click', function() {
    modal.classList.add('modal_opened');
    profileNameInput.value = profileExistingName.textContent;
    profileDescInput.value = profileExistingDesc.textContent;
  });
  
  profileEditCloseBtn.addEventListener('click', () => {s
    modal.classList.remove('modal_opened');
  });
  
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileExistingName.textContent = profileNameInput.value.trim();
    profileExistingDesc.textContent = profileDescInput.value.trim();
    modal.classList.remove('modal_opened');
  });
  
  // Add Modal Event Listeners
  addModalOpenBtn.addEventListener('click', () => {
    addModal.classList.add('add_opened');
  });
  
  addModalClose.addEventListener('click', () => {
    addModal.classList.remove('add_opened');
  });
  
  addModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newCardData = {
      name: addModalForm.name.value.trim(),
      link: addModalForm.url.value.trim(),
    };
    if (newCardData.name && newCardData.link) {
      cardList.prepend(getCardElement(newCardData));
      addModalForm.reset();
      addModal.classList.remove('add_opened');
    }
  });
  
  // Picture Modal
  cardImageModalCloseBtn.addEventListener('click', () => {
    cardImageModal.classList.remove('picture__modal_opened');
  });
  
  // <---------       Functions       ----------->
  
  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardDeleteBtn = cardElement.querySelector('.card__delete');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    cardLikeBtn.addEventListener('click', () => {
      cardLikeBtn.classList.toggle('card__like-button--active');
    });
  
    cardDeleteBtn.addEventListener('click', () => {
      cardElement.remove();
    });
  
    cardImage.addEventListener('click', () => {
      cardImageModalImg.src = cardData.link;
      cardImageModalImg.alt = cardData.name;
      cardImageModal.classList.add('picture__modal_opened');
    });
  
    return cardElement;
  }
  
  initialCards.forEach((cardData) => {
    cardList.appendChild(getCardElement(cardData));
  });
  
  
  