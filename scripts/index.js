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

  const profileEditBtn = document.getElementById('profile__edit-button');
  profileEditBtn.addEventListener('click', function() {
    document.querySelector('.modal').setAttribute('style', 'display: flex');
    
    let profileExistingName = document.querySelector('.profile__title'); 
    document.querySelector('.modal__form-name').setAttribute('placeholder', profileExistingName.textContent);

    let profileExistingDesc = document.querySelector('.profile__description'); 
    document.querySelector('.modal__form-description').setAttribute('placeholder', profileExistingDesc.textContent);

  });

  const profileEditCloseBtn = document.querySelector('.modal__close');
  profileEditCloseBtn.addEventListener('click', function() {
    document.querySelector('.modal').setAttribute('style', 'display: none');
  })

  function changeInfo(event){
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
  
    let newProfileName = document.querySelector('.modal__form-name').value; // Get the new value from input field
    let newDescription = document.querySelector('.modal__form-description').value; // Get the new value from input field
  
    let profileExistingName = document.querySelector('.profile__title');
    let profileExistingDesc = document.querySelector('.profile__description');
  
    if (newProfileName.trim() !== '') { // Only update if a new profile name is entered
      profileExistingName.textContent = newProfileName;
    }
    
    if (newDescription.trim() !== '') { // Only update if a new description is entered
      profileExistingDesc.textContent = newDescription;
    } 
  };

  document.querySelector('.modal__submit').addEventListener('click', changeInfo);

  