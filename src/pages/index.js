import Card from "../components/Cards.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithPictures.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import { initialCards, config } from "../utils/constants.js";
import "../pages/index.css"


// Select DOM elements
const profileEditBtn = document.getElementById("profile__edit-button");
const profileNameInput = document.querySelector("[name='title']");
const profileDescInput = document.querySelector("[name='about']");
const addModalOpenBtn = document.querySelector(".profile__add-button");
const pictureNameInput = document.querySelector("[name='name']");
const pictureUrlInput = document.querySelector("[name='url']")
const pictureSubmitButton = document.querySelector("#picture_submit");
const avatarEditBtn = document.querySelector(".profile__avatar-button");
const deleteButton = document.querySelectorAll(".card__delete");
const confirmSubmitBtn = document.querySelector("#confirmation__modal_submit");
const confirmCloseBtn = document.querySelector("#confirmation__modal_close");
const likeButtons = document.querySelectorAll(".card__like-button");
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const profileSubmitButton = document.querySelector('#profileModal .modal__submit');
const confirmPopupSubmit = document.querySelector('#confirmation__modal .modal__confirmation_submit')
const addModalForm = document.querySelector("#add__modal_form")
const avatarModalForm = document.querySelector("#avatar__modal_form")
const addCardPopupSubmit = document.querySelector('#modal__add .modal__submit')
const profileEdit = document.querySelector("#edit__modal_form")
//---------------------API GOODS------------------------------------
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5ccc6b19-133c-4069-8a7f-6b43c87f27eb",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      title: data.name,
      about: data.about,
    });
    userInfo.setAvatar(data);
  })
  .catch((err) => console.error(err));


const cardSection = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);

// Fetch API cards and render them inside the same section
api.getInitialCards()
  .then((cards) => {
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData); // Generate card using createCard
      cardSection.addItem(cardElement); // Properly add to `.gallery__cards`
      const likeBtn = document.querySelector('.card__like-button');
    });
  })
  .catch((err) => {
    console.log('somethings wrong with getInitialCards', err);
  });

//---------------------FORMS AND VALIDATION AND SUBMIT BUTTONS RESPONSES--------------------------

// Initialize form validation
const addCardValidator = new FormValidator(config, addModalForm);
const profileValidator = new FormValidator(config, profileEdit);
const avatarValidator = new FormValidator(config, avatarModalForm);
addCardValidator.enableValidation();
profileValidator.enableValidation();
avatarValidator.enableValidation();

//-----------------------POPUPS--------------------------------
// Create Popups
const imagePopup = new PopupWithImage("#modal__picture");
imagePopup.setEventListeners();

//  Initialize `UserInfo`
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
});

// Makes changing submit button easier and more dynamic 
function submitButtonTextChanger(button, newTextContent){
  return button.textContent = newTextContent
}

const profilePopup = new PopupWithForm("#profileModal", (formData) => {
  const originalText = profileSubmitButton.textContent;
  submitButtonTextChanger(profileSubmitButton, 'Saving...');

  api.updateUserInfo(formData.title, formData.about) // sends to Api.js to save to database
    .then((updatedData) => {
      userInfo.setUserInfo(formData);
      profilePopup.close(); 
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(()=>{
      profileSubmitButton.textContent = originalText;
      console.log('changing prof submit button text back to original')
    })
});

profilePopup.setEventListeners();


const addCardPopup = new PopupWithForm("#modal__add", (formData) => {
  const originalText = addCardPopupSubmit.textContent;
  submitButtonTextChanger(addCardPopupSubmit, 'Saving...')

  const newCardData = {
    name: formData.name.trim(),
    link: formData.url.trim(),
  };

  if (newCardData.name && newCardData.link) {
    api.updateNewCards(newCardData) 
      .then((savedCard) => {
        
        console.log('changing add card submit text to Saving')
        // Ensure the savedCard has all necessary properties
        const fullCardData = {
          ...savedCard,
          likes: [], // Initialize empty likes array
          _id: savedCard._id, // Ensure _id is present
        };

        const cardElement = createCard(fullCardData)
        cardSection.addItem(cardElement); 
        addModalForm.reset();
        addCardPopup.close(); 
      })
      .catch((err) => {
        console.error("Error adding new card:", err);
      })
      .finally(()=>{
        addCardPopupSubmit.textContent = originalText;
        console.log('changing add submit button text back to original')
      })
  }else{
    console.log('something is wrong with addCardPopup, the if is returning falsey')
  }
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar__modal", (formData) => {
  const avatarPopupSubmit = document.querySelector('#avatar__modal .modal__submit');
  const originalText = avatarPopupSubmit.textContent;
  submitButtonTextChanger(avatarPopupSubmit, 'Saving...');

  api.updateAvatar(formData.avatar_url) 
    .then((updatedData) => {
      userInfo.setAvatar(updatedData); // Updates avatar 
      avatarModalForm.reset(); 
      avatarPopup.close(); 
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(()=>{
      avatarPopupSubmit.textContent = originalText;
    })
});
avatarPopup.setEventListeners();

const confirmationPopup = new PopupWithConfirm("#confirmation__modal");
confirmationPopup.setEventListeners(); 


function handleConfirmPopup(card, cardElement) {
  const confirmPopupOriginal = confirmPopupSubmit.textContent;
  confirmationPopup.setSubmitFunction(() => {
    submitButtonTextChanger(confirmPopupSubmit, 'Deleting...');
    api.deletingCards(card)
      .then(() => { 
        cardElement.remove();
        confirmationPopup.close();
      })
      .catch(err => {console.log("error in handleConfirmPopup:", err)
      })
      .finally(()=>{
        confirmPopupSubmit.textContent = confirmPopupOriginal;
      })
  });
  confirmationPopup.open();
}


//---------------------CREATING & RENDER CARD--------------------
// Function to create and render a card
function createCard(cardData) {
  return new Card(
    cardData, 
    "#card__template", 
    (data) => imagePopup.open(data),
    () => api.likeCard(cardData._id)
      .catch(err => console.error("Error liking card:", err)), // Added this line
    () => api.dislikeCard(cardData._id)
      .catch(err => console.error("Error disliking card:", err)), // Added this line
    handleConfirmPopup
  ).generateCard();
}

//-------------------------Open modal buttons and submit buttons event listenrs---------------------



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

  addCardValidator.resetValidation(); 
  addCardPopup.open();
});

avatarEditBtn.addEventListener('click', ()=> {

  avatarValidator.resetValidation();
  avatarPopup.open();
})




