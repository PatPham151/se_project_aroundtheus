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
  const cardTemplate = document.querySelector('#card__template').content.firstElementChild;

  const modal = document.querySelector('.modal');
  const profileEditBtn = document.getElementById('profile__edit-button');
  const profileEditCloseBtn = document.querySelector('.modal__close');
  const submitButtonClose = document.querySelector("[name='modal__submit']");
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
  const cardImageModalCloseBtn = document.querySelector('.picture__container_close')
  const cardImageModalImg = document.querySelector('.picture__modal_image');
  const cardImageModalDesc = document.querySelector('.picture__modal_description')
  const cardImage = document.querySelector('.card__image');

  /*---------------------------------------------------------------------------*/
  /*---                             EventListeners                        -----*/
  /*---------------------------------------------------------------------------*/

  //-----------------------Edit modal Functionality

  //Opens and prefills edit modal
  profileEditBtn.addEventListener('click', function() {
    modal.classList.add('modal_opened');
    profileNameInput.value = profileExistingName.textContent;
    profileDescInput.value = profileExistingDesc.textContent;
  });

  //Closes modal
  profileEditCloseBtn.addEventListener('click', closeProfileModal);

  // Submit form and close modal
  modalForm.addEventListener('submit', function(event) {
    event.preventDefault();
    changeInfo();
    closeProfileModal();
  });


  //----------------------Add Image Modal Functionality

  addModalOpenBtn.addEventListener('click', () => {
    addModal.classList.add('add_opened'); //opens add window
  });

  addModalClose.addEventListener('click', () => {
    addModal.classList.remove('add_opened'); //closes add window
  });

  addModalForm.addEventListener('submit', (event) => { //prepend into newCardData
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

   //-------------------------Picture Modal

   //Opens picture when clicked on
   cardImageModalCloseBtn.addEventListener('click', () => {
    cardImageModal.classList.remove('picture__modal_opened');
  });


  /*---------------------------------------------------------------------------*/
  /*---                             Functions                             -----*/
  /*---------------------------------------------------------------------------*/

  // Function to close the modal
  function closeProfileModal() {
    modal.classList.remove('modal_opened');
  }

  function closeAddModal() {
    addModal.classList.remove('add_opened');
  }

  function closePictureModal(){
    cardImageModal.classList.remove('picture__modal_opened');
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
    // Clone the template
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardDeleteBtn = cardElement.querySelector('.card__delete'); // Select the delete button

    //Like button functionality
    cardLikeBtn.addEventListener('click', () => {
      cardLikeBtn.classList.toggle('card__like-button--active');
    });

    // Populate card data
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    cardTitle.textContent = cardData.name;

    // Attach delete functionality
    cardDeleteBtn.addEventListener('click', function () {
      cardElement.remove(); // Remove the specific card from the DOM
    });

    // Attach picture modal
    cardImage.addEventListener('click', () => {
      cardImageModalImg.src = cardData.link || "";
      cardImageModalImg.alt = cardData.name || "Card Image"
      cardImageModalDesc.textContent = cardData.name || "Card Description";
      cardImageModal.classList.add('picture__modal_opened');
    });

    return cardElement;
  }


  // Loop through initialCards and append them
  initialCards.forEach(cardData => {
    const cardElement = getCardElement(cardData);
    cardList.appendChild(cardElement);
  });