/*---------------------------------------------------------------------------*/
/*---                             Variables                             -----*/
/*---------------------------------------------------------------------------*/

const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const cardList = document.querySelector('.gallery__cards');
const profileEditBtn = document.getElementById('profile__edit-button');
const profileEditCloseBtn = document.querySelector('.modal__close');
const submitButtonClose = document.querySelector("[name='modal__submit']");
const modal = document.querySelector('.modal');
const modalForm = document.querySelector('.modal__form');
const profileExistingName = document.querySelector('.profile__title');
const profileExistingDesc = document.querySelector('.profile__description');
const profileNameInput = document.querySelector("[name='title']");
const profileDescInput = document.querySelector('.modal__input-description');
const cardTemplate = document.querySelector('#card__template').content.firstElementChild;


/*---------------------------------------------------------------------------*/
/*---                             EventListeners                        -----*/
/*---------------------------------------------------------------------------*/

// Open modal when edit button is clicked
profileEditBtn.addEventListener('click', function() {
  modal.classList.add('modal__opened');
  profileNameInput.value = profileExistingName.textContent;
  profileDescInput.value = profileExistingDesc.textContent;
});

// Close modal when close button is clicked
profileEditCloseBtn.addEventListener('click', closeProfileModal);

// Submit form and close modal
modalForm.addEventListener('submit', function(event) {
  event.preventDefault();
  changeInfo();
  closeProfileModal();
});

/*---------------------------------------------------------------------------*/
/*---                             Functions                             -----*/
/*---------------------------------------------------------------------------*/

// Function to close the modal
function closeProfileModal() {
  modal.classList.remove('modal__opened');
}

// Function to change profile info
function changeInfo() {
  const newProfileName = profileNameInput.value.trim();
  const newDescription = profileDescInput.value.trim();

  if (newProfileName !== '') {
    profileExistingName.textContent = newProfileName;
  }

  if (newDescription !== '') {
    profileExistingDesc.textContent = newDescription;
  }
}

// Function to get and append card elements
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  cardTitle.textContent = cardData.name;

  return cardElement;
}

// Loop through initialCards and append them
initialCards.forEach(cardData => {
  const cardElement = getCardElement(cardData);
  cardList.appendChild(cardElement);
});
