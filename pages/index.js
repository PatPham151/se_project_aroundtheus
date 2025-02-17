import Card from "../components/Cards.js"; 
import FormValidator from "../components/FormValidator.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error-active"
};

const addModalForm = document.querySelector("#add__modal_form");
const profileForm = document.querySelector("#edit__modal_form"); 
const addCardValidator = new FormValidator(config, addModalForm);
const profileValidator = new FormValidator(config, profileForm);
addCardValidator.enableValidation();
profileValidator.enableValidation();

const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" }
];

const cardList = document.querySelector(".gallery__cards");
const profileEditBtn = document.getElementById("profile__edit-button");
const profileExistingName = document.querySelector(".profile__title");
const profileExistingDesc = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("[name='title']");
const profileDescInput = document.querySelector("[name='about']");
const profileModal = document.getElementById("profileModal");
const addModal = document.querySelector("#modal__add");
const addModalOpenBtn = document.querySelector(".profile__add-button");
const modals = document.querySelectorAll(".modal");
const cardImageModal = document.querySelector("#modal__picture");
const cardImageModalImg = document.querySelector(".modal__image");
const cardImageModalDesc = document.querySelector(".modal__image-description");
const addCardSubmitButton = addModalForm.querySelector(config.submitButtonSelector);


function createCard(cardData) {
  const card = new Card(cardData, "#card__template", openPictureModal);
  return card.generateCard();
}


function openPictureModal(cardData) {
  cardImageModalImg.src = cardData.link;
  cardImageModalImg.alt = cardData.name;
  cardImageModalDesc.textContent = cardData.name;
  openModal(cardImageModal);
}


initialCards.forEach((cardData) => {
  cardList.appendChild(createCard(cardData));
});


profileEditBtn.addEventListener("click", () => {
  openModal(profileModal);
  profileValidator.resetValidation(); 
  profileNameInput.value = profileExistingName.textContent;
  profileDescInput.value = profileExistingDesc.textContent;
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileExistingName.textContent = profileNameInput.value.trim() || profileExistingName.textContent;
  profileExistingDesc.textContent = profileDescInput.value.trim() || profileExistingDesc.textContent;
  closeModal(profileModal);
});

addModalOpenBtn.addEventListener("click", () => {
  addCardValidator.resetValidation();
  openModal(addModal);
});

modals.forEach(modal => {
  modal.querySelector('.modal__close').addEventListener('click', () => closeModal(modal));
});

addModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCardData = {
    name: addModalForm.name.value.trim(),
    link: addModalForm.url.value.trim(),
  };

  if (newCardData.name && newCardData.link) {
    cardList.prepend(createCard(newCardData)); 
    addModalForm.reset();
    
    
    closeModal(addModal);
  }
});

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === e.currentTarget) {
      closeModal(modal);
    }
  });
});

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}


function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}


function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal.modal_opened");
    const openPictureModal = document.querySelector("#modal__picture.modal_opened"); 

    if (openPictureModal) {
      closeModal(openPictureModal); 
    } else if (openModal) {
      closeModal(openModal);
    }
  }
}


