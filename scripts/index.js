import Card from "../components/Card.js";
import FormValidator from "../components/Validation.js";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error-active"
};

const formValidator = new FormValidator(config);
formValidator.enableValidation();

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
const profileForm = document.querySelector(".modal__form");
const profileExistingName = document.querySelector(".profile__title");
const profileExistingDesc = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("[name='title']");
const profileDescInput = document.querySelector("[name='about']");
const profileModal = document.getElementById("profileModal");
const addModal = document.querySelector("#modal__add");
const addModalForm = document.querySelector("#add__modal_form");
const addModalOpenBtn = document.querySelector(".profile__add-button");
const modals = document.querySelectorAll(".modal");



function openPictureModal(cardData) {
  const cardImageModal = document.querySelector("#modal__picture");
  const cardImageModalImg = document.querySelector(".modal__image");
  const cardImageModalDesc = document.querySelector(".modal__image-description");
  
  cardImageModalImg.src = cardData.link;
  cardImageModalImg.alt = cardData.name;
  cardImageModalDesc.textContent = cardData.name;
  cardImageModal.classList.add("modal_opened");
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card__template", openPictureModal);
  const cardElement = card._generateCard();
  cardList.appendChild(cardElement);
});

profileEditBtn.addEventListener("click", () => {
  openModal(profileModal);
  profileNameInput.value = profileExistingName.textContent;
  profileDescInput.value = profileExistingDesc.textContent;
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileExistingName.textContent = profileNameInput.value.trim() || profileExistingName.textContent;
  profileExistingDesc.textContent = profileDescInput.value.trim() || profileExistingDesc.textContent;
  closeModal(profileModal);
});

addModalOpenBtn.addEventListener("click", () => openModal(addModal));

modals.forEach(modal => {
  modal.querySelector('.modal__close').addEventListener('click', () => closeModal(modal));
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    const newCardData = {
      name: addModalForm.name.value.trim(),
      link: addModalForm.url.value.trim(),
    };
    if (newCardData.name && newCardData.link) {
      const newCard = new Card(newCardData, "#card__template", openPictureModal);
      const newCardElement = newCard._generateCard();
      cardList.prepend(newCardElement);
      addModalForm.reset();
      closeModal(addModal);
    }
  }
});

addModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCardData = {
    name: addModalForm.name.value.trim(),
    link: addModalForm.url.value.trim(),
  };
  if (newCardData.name && newCardData.link) {
    const newCard = new Card(newCardData, "#card__template", openPictureModal);
    const newCardElement = newCard._generateCard();
    cardList.prepend(newCardElement);
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
    if (openModal) {
      closeModal(openModal);
    }
  }
}
