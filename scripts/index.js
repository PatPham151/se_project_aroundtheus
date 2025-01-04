/*---------------------------------------------------------------------------*/
/*---                             Variables                             -----*/
/*---------------------------------------------------------------------------*/

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

const modals = document.querySelectorAll('.modal');
const profileEditBtn = document.getElementById('profile__edit-button');
const profileForm = document.querySelector('.modal__form');
const profileExistingName = document.querySelector('.profile__title');
const profileExistingDesc = document.querySelector('.profile__description');
const profileNameInput = document.querySelector("[name='title']");
const profileDescInput = document.querySelector("[name='about']");
const profileModal = document.getElementById('profileModal');

const addModal = document.querySelector('#modal__add');
const addModalForm = document.querySelector('#add__modal_form');
const addModalOpenBtn = document.querySelector('.profile__add-button');

const cardImageModal = document.querySelector('#modal__picture');
const cardImageModalImg = document.querySelector('.modal__image');
const cardImageModalDesc = document.querySelector('.modal__image-description');

/*---------------------------------------------------------------------------*/
/*---                             EventListeners                        -----*/
/*---------------------------------------------------------------------------*/

// Edit modal functionality
profileEditBtn.addEventListener('click', () => {
  openModal(profileModal);
  profileNameInput.value = profileExistingName.textContent;
  profileDescInput.value = profileExistingDesc.textContent;
});

// Submit form and update profile info
profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileExistingName.textContent = profileNameInput.value.trim() || profileExistingName.textContent;
  profileExistingDesc.textContent = profileDescInput.value.trim() || profileExistingDesc.textContent;
  closeModal(profileModal);
});

// Add image modal functionality
addModalOpenBtn.addEventListener('click', () => openModal(addModal));

addModalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newCardData = {
    name: addModalForm.name.value.trim(),
    link: addModalForm.url.value.trim(),
  };
  if (newCardData.name && newCardData.link) {
    cardList.prepend(getCardElement(newCardData));
    addModalForm.reset();
    closeModal(addModal);
  }
});



/*---------------------------------------------------------------------------*/
/*---                             Functions                             -----*/
/*---------------------------------------------------------------------------*/

// Open modal function
function openModal(modal) {
  modal.classList.add('modal_opened');
}

// Close modal function
function closeModal(modal) {
  modal.classList.remove('modal_opened');
}

// Picture modal functionality
function openPictureModal(cardData) {
  cardImageModalImg.src = cardData.link;
  cardImageModalImg.alt = cardData.name;
  cardImageModalDesc.textContent = cardData.name;
  openModal(cardImageModal);
}

// Close all modals when close button is clicked
modals.forEach(modal => {
  modal.querySelector('.modal__close').addEventListener('click', () => closeModal(modal));
});

// Function to create card elements
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardDeleteBtn = cardElement.querySelector('.card__delete');

  // Like button functionality
  cardLikeBtn.addEventListener('click', () => {
    cardLikeBtn.classList.toggle('card__like-button--active');
  });

  // Populate card data
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Delete functionality
  cardDeleteBtn.addEventListener('click', () => {
    cardElement.remove();
  });

  // Picture modal functionality
  cardImage.addEventListener('click', () => openPictureModal(cardData));

  return cardElement;
}

// Function to render cards
function renderCards(cards, container) {
  cards.forEach(cardData => {
    const cardElement = getCardElement(cardData);
    container.appendChild(cardElement);
  });
}

// Render initial cards
renderCards(initialCards, cardList);
