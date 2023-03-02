class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }

  //получение карточек с сервера
  getInitialCards() {
    return fetch(`https://mesto.${this.baseUrl}cards`, {
      method: 'GET',
      headers: this.headers
    })
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }})
    .catch((err) => {
        console.log(err);
    }) 
  }

  //получения информации о пользователе с сервера
  getUserInfo() {
    return fetch(`https://${this.baseUrl}users/me`, {
      method: 'GET',
      headers: this.headers
    })
   .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }})
    .catch((err) => {
        console.log(err);
    }) 
  }

  //изменение информации о пользователе
  changeUserInfo(newInfo) {
    const newName = newInfo.name;
    const newDescription = newInfo.description;
    return fetch(`https://mesto.${this.baseUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }})
    .catch((err) => {
        console.log(err);
    }) 
  }

  //изменение аватара пользователя
  changeAvatar(newAvatar) {
    return fetch(`https://mesto.${this.baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
    .then((res) => {
        if (res.ok) {
          return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }})
    .catch((err) => {
        console.log(err);
    }) 
  }

  //добавление новой карточки
  addNewCard(newCard) {
    const cardName = newCard.name;
    const cardLink = newCard.link;
    return fetch(`https://mesto.${this.baseUrl}cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
    })
    .then((res) => {
        if (res.ok) {
          return res.json()
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }})
    .catch((err) => {
        console.log(err);
    }) 
  }

  //удаление карточки
  deleteCard(cardId) {
    return fetch(`https://mesto.${this.baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
      return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  //переключение лайков
  toggleLike(cardId, like) {
    if (like.classList.contains('element__active-like')) {
      return fetch(`https://mesto.${this.baseUrl}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
        return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      }) 
    } else {
      return fetch(`https://mesto.${this.baseUrl}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        })
      .catch((err) => {
        console.log(err);
      }) 
    }
  }
}; 

export { Api };