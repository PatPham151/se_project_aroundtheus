export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
}

_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
} 
  
  // fetch the info from the database 
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      })
  .catch((err)=>{console.log('error fetching user info:', err)
  });
  }

  //patches the database with users input
  updateUserInfo(name, about) {
    console.log(name, about)
      return fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about
          }),
        })
        .then(this._checkResponse)
        .catch(err => {console.log('error in updateUserInfo: ', err)})
  }
  
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, { 
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }), 
    })
    .then(this._checkResponse);
  }
      
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
    .then((data) => {
      console.log("Fetched Cards:", data); 
      return data; // 
    })
    .catch((err) => console.error("Error fetching cards:", err));
  }
      
  updateNewCards(card){
    console.log("Sending new Card data:", card);

  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({ name: card.name, link: card.link }),
  })
  .then((res)=>{
  this._checkResponse
  console.log(" Response Status:", res.status);
  return res.ok ? res.json() : res.text().then((err) => Promise.reject(`Error: ${res.status} - ${err}`));
  })
  .catch((err) => {
      console.error(" error in updateNewCards in Api.js:", err);
    });
  }

  deletingCards(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { 
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse)
    .catch((err) => {
      console.error("Error Deleting Card:", err);
      return Promise.reject(err);
    });
  }

  checkLike(cardId, currentUserId) {
  return fetch(`${this._baseUrl}/cards/${cardId}`, {
    method: "GET",
    headers: this._headers
  })
    .then(this._checkResponse)
    .then(cardData => {
      // Assume cardData.likes is an array of user objects
      return cardData.likes.some(user => user._id === currentUserId);
    });
}

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
  