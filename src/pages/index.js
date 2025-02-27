import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithPictures.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "../pages/index.css"

//---------------------RENDERING INITIAL CARDS-------------------

const initialCards = [
  { name: "Yosemite Valley", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg" },
  { name: "Lake Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg" },
  { name: "Bald Mountains", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg" },
  { name: "Vanoise National Park", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg" },
];

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);

// ✅ Render initial cards
cardSection.renderItems();

//---------------------FORMS AND SUBMITS--------------------------

// Config for form validation
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error-active",
};

// Initialize form validation
const addCardValidator = new FormValidator(config, document.querySelector("#add__modal_form"));
const profileValidator = new FormValidator(config, document.querySelector("#edit__modal_form"));
addCardValidator.enableValidation();
profileValidator.enableValidation();

//-----------------------POPUPS--------------------------------

// Create Popups
const imagePopup = new PopupWithImage("#modal__picture");
imagePopup.setEventListeners();

// Initialize `UserInfo`
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description"
});

const profilePopup = new PopupWithForm("#profileModal", (formData) => {
  // Use `setUserInfo()` properly
  userInfo.setUserInfo(formData);
});
profilePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#modal__add", (formData) => {
  const newCardData = {
    name: formData.name.trim(),
    link: formData.url.trim(),
  };

  if (newCardData.name && newCardData.link) {
    cardSection.addItem(createCard(newCardData));
  }
});
addCardPopup.setEventListeners();

//---------------------CREATING & RENDER CARD--------------------

// Function to create and render a card
function createCard(cardData) {
  return new Card(cardData, "#card__template", (data) => imagePopup.open(data)).generateCard();
}

// Select DOM elements
const profileEditBtn = document.getElementById("profile__edit-button");
const profileNameInput = document.querySelector("[name='title']");
const profileDescInput = document.querySelector("[name='about']");
const addModalOpenBtn = document.querySelector(".profile__add-button");

profileEditBtn.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  console.log("User Info Retrieved:", userData);

  profileNameInput.value = userData.title;
  profileDescInput.value = userData.about;

  console.log("Name Input Value After Assignment:", profileNameInput.value);
  console.log("Description Input Value After Assignment:", profileDescInput.value);

  profileValidator.resetValidation();
  profilePopup.open();
});

// Event listener for opening the "Add Card" modal
addModalOpenBtn.addEventListener("click", () => {
  addCardPopup.open();
});

