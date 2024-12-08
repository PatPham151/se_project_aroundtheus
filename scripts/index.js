const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
  }
];

  //shows the edit window once edit button is clicked also prefills info
  const profileEditBtn = document.getElementById('profile__edit-button');
  profileEditBtn.addEventListener('click', function() {
    document.querySelector('.modal').setAttribute('style', 'display: flex');

    let profileExistingName = document.querySelector('.profile__title');
    document.querySelector('.modal__form-name').setAttribute('placeholder', profileExistingName.textContent);

    let profileExistingDesc = document.querySelector('.profile__description');
    document.querySelector('.modal__form-description').setAttribute('placeholder', profileExistingDesc.textContent);

  })
  //allows close button to work
  const profileEditCloseBtn = document.querySelector('.modal__close');
  profileEditCloseBtn.addEventListener('click', function() {
    document.querySelector('.modal').setAttribute('style', 'display: none');


  })


  //Allows user to change Name and Description
  function changeInfo(event){
    event.preventDefault();
    let newProfileName = document.querySelector('.modal__form-name').value;
    let newDescription = document.querySelector('.modal__form-description').value;

    let profileExistingName = document.querySelector('.profile__title');
    let profileExistingDesc = document.querySelector('.profile__description');

    //Allows for changing one Name or Description one at a time without clearing the other
    if (newProfileName.trim() !== '') {
      profileExistingName.textContent = newProfileName;
    }

    if (newDescription.trim() !== '') {
      profileExistingDesc.textContent = newDescription;
    }
  };


  //closes the Edit popup upon the save button being clicked
  const submitButtonClose = document.querySelector('.modal__submit');
  submitButtonClose.addEventListener('click', function(){
    document.querySelector('.modal').setAttribute('style', 'display: none');
  })
  //updates new info to take over old info
  document.querySelector('.modal__submit').addEventListener('click', changeInfo);


  //Card Images and Title and template manipulation


  
  const cardTemplate = document.querySelector('#card__template').content.firstElementChild; //loads the template 
  
  // Get the card element from the template and populate it with data
  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true); // Clones the template
    
    const cardImage = cardElement.querySelector('.card__image'); // Select the card image
    const cardTitle = cardElement.querySelector('.card__title'); // Select the card title
    
    
    // Set the image src to the cardData link
    cardImage.setAttribute('src', cardData.link);

    cardImage.setAttribute('alt', cardData.name);
    
    // Set the card title to the cardData name
    cardTitle.textContent = cardData.name;
    
    return cardElement;
  }
  
  // Loop through the cards array and append the card element
  for (let i = 0; i < initialCards.length; i++) {
    const cardElement = getCardElement(initialCards[i]); // Get card element with data
    document.querySelector('.gallery__cards').appendChild(cardElement); // Append it to the card list
  }



