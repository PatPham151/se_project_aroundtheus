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


//---------------------API GOODS------------------------------------

// Select all submit buttons with the class "modal__submit"
const submitButtons = document.querySelectorAll('.modal__submit');

// Add an event listener to each button
submitButtons.forEach((button) => {
  button.addEventListener('click', function() {
    
    const originalText = this.textContent;
    
    
    this.textContent = 'saving';
    
    // After 2 seconds, revert the text back to the original. I sure hope this 
    // is what you meant 
    setTimeout(() => {
      this.textContent = originalText;
    }, 2000);
  });
});


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5ccc6b19-133c-4069-8a7f-6b43c87f27eb",
    "Content-Type": "application/json",
  },
});

api.getUserInfo()
.then((res) => res.ok ? res.json() : Promise.reject(`Error: ${res.status}`))
  .then((data)=> {
    console.log(data)
    profileName.textContent = data.name
    profileDesc.textContent = data.about
    profileAvatar.src = data.avatar; 
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

function fillCardLike(){
  const likeBtn = document.querySelector('.card__like-button');
  likeBtn.classList.toggle('card__like-button--active');
}

function emptyCardLike(){
  const likeBtn = document.querySelector('.card__like-button');
  likeBtn.classList.remove('card__like-button--active');
}

// Fetch API cards and render them inside the same section
api.getInitialCards()
.then((cards) => {
  cards.forEach((cardData) => {
    const cardElement = createCard(cardData); // Generate card using createCard
    cardSection.addItem(cardElement); // Properly add to `.gallery__cards`
    
    console.log(cardData.isLiked)
    if(cardData.isLiked){
      console.log(cardData._id);  
      fillCardLike();
    }else{
      emptyCardLike();
    }
  });
});

//---------------------FORMS AND VALIDATION AND SUBMIT BUTTONS RESPONSES--------------------------

// Initialize form validation
const addCardValidator = new FormValidator(config, document.querySelector("#add__modal_form"));
const profileValidator = new FormValidator(config, document.querySelector("#edit__modal_form"));
const avatarValidator = new FormValidator(config, document.querySelector("#avatar__modal_form"));
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

const profilePopup = new PopupWithForm("#profileModal", (formData) => {
  userInfo.setUserInfo(formData); // Make changes on the page right away
  
  api.updateUserInfo(formData.title, formData.about) // sends to Api.js to save to database
    .then((updatedData) => {
      profilePopup.close(); 
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });
});

profilePopup.setEventListeners();


const addCardPopup = new PopupWithForm("#modal__add", (formData) => {
  const newCardData = {
    name: formData.name.trim(),
    link: formData.url.trim(),
  };

  if (newCardData.name && newCardData.link) {
    api.updateNewCards(newCardData) 
      .then((savedCard) => {
        const cardElement = createCard(newCardData)
        cardSection.addItem(cardElement); 
        document.querySelector("#add__modal_form").reset(); // 
        addCardPopup.close(); 
      })
      .catch((err) => {
        console.error("Error adding new card:", err);
      });
  }
});
addCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar__modal", (formData) => {
  console.log("Avatar Form Data:", formData);

  api.updateAvatar(formData.avatar_url) 
    .then((updatedData) => {
      userInfo.setAvatar(updatedData); // Updates avatar 
      
      document.querySelector("#avatar__modal_form").reset(); 
      avatarPopup.close(); 
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    });
});
avatarPopup.setEventListeners();

const confirmationPopup = new PopupWithConfirm("#confirmation__modal", (cardId) => {

  api.deletingCards(cardId)
    .then(() => {
      confirmationPopup.close(); // Close modal after deletion
      console.log('the PopupWithConfirm is working ')
    })
    .catch((err) => {
      console.error("Error deleting card: confirmationPopup catch ", err);
    });
});

confirmationPopup.setEventListeners(); 

function handleLikeButton(cardData){
  api.likeCard(cardData._id);
}

function handleDislikeButton(cardData){
  api.dislikeCard(cardData._id);
}


function handleConfirmPopup(card) {
  confirmationPopup.setSubmitFunction(() => {
    api.deletingCards(card._id)
      .then(() => { 
        const cardElement = card._element; // Use the stored element
        if (card._element) {
          card._element.remove();
        } else {
          console.error('No element found to remove');
        }
        confirmationPopup.close();
        
      })
      .catch(console.error);
  });
  confirmationPopup.open();
}


//---------------------CREATING & RENDER CARD--------------------
// Function to create and render a card
function createCard(cardData) {
  return new Card(
    cardData, 
    "#card__template", 
    (data) => 
    imagePopup.open(data),
    () => handleLikeButton(cardData),
    () => handleDislikeButton(cardData),
    () => handleConfirmPopup(cardData),
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
  avatarPopup.open();
})

likeButtons.forEach((button) => {
  button.addEventListener("click", (evt) => {
    // Here we need to figure out which card was clicked
    console.log("Like button clicked!");
  });
});



