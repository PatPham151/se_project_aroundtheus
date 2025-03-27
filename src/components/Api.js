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
      .then(this._checkResponse)
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
  }
      
  updateNewCards(card){
    console.log("Sending new Card data:", card);

  return fetch(`${this._baseUrl}/cards`, {
    method: "POST",
    headers: this._headers,
    body: JSON.stringify({ name: card.name, link: card.link }),
  })
  .then(this._checkResponse)
  }

  deletingCards(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, { 
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse)
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
  