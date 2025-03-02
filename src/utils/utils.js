import Card from "../components/Cards.js";
import PopupWithImage from "../components/PopupWithPictures.js";

// ✅ Create and render a card
export function createCard(cardData, imagePopup) {
  return new Card(cardData, "#card__template", (data) => imagePopup.open(data)).generateCard();
}

// ✅ Handle Profile Edit Click
export function handleProfileEdit(userInfo, profileNameInput, profileDescInput, profileValidator, profilePopup) {
  const userData = userInfo.getUserInfo();
  console.log("User Info Retrieved:", userData);

  profileNameInput.value = userData.title; 
  profileDescInput.value = userData.about;

  console.log("Name Input Value After Assignment:", profileNameInput.value);
  console.log("Description Input Value After Assignment:", profileDescInput.value);

  profileValidator.resetValidation();
  profilePopup.open();
}

// ✅ Handle Add Card Modal Open
export function handleAddCardOpen(addCardValidator, addCardPopup) {
  addCardValidator.resetValidation();
  addCardPopup.open();
}
