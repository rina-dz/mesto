//Токен: 9d97c533-6f82-4668-9816-7bf0cf3c6ccd
//Идентификатор группы: cohort-60
import './index.css';
import { buttonToEdit, buttonToAdd, buttonToChange, nameInput, jobInput, elementTemplate, validationConfig } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupForDeleteCard } from '../components/PopupForDeleteCard.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: '9d97c533-6f82-4668-9816-7bf0cf3c6ccd',
    'Content-Type': 'application/json'
  }
});
//переменная с id пользователя
let userId;
//отображение карточек с сервера и Загрузка информации о пользователе с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    const info = { name: userData.name, description: userData.about, avatar: userData.avatar, _id: userData._id };
    userId = userData._id;
    userInformation.setUserInfo(info);

    cardsAdding.renderAllItems(cards);
    return userId;
  })
  .catch((err) => {
    console.log(err);
  })
//информация о пользователе и валидация
const userInformation = new UserInfo({ userName: '.profile__name', userDescription: '.profile__description', userAvatar: '.profile__avatar' }, userId);
const editFormValidator = new FormValidator(validationConfig, document.querySelector('#edit_form'));
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationConfig, document.querySelector('#add_form'));
addFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(validationConfig, document.querySelector('#avatar_form'));
avatarFormValidator.enableValidation();
//создание секции для карточек
const cardsAdding = new Section(
  {
    renderer: (card) => {
      const owner = card.owner;
      const likes = card.likes;
      const newCard = createCard(card.link, card.name, likes.length, card._id, owner._id, likes);
      cardsAdding.addDefaultItems(newCard);
    }
  }, '.elements');
//попап-картинка
const imagePopup = new PopupWithImage('#popup_image');
imagePopup.setEventListeners();
//попап для удаления карточки
const deletePopup = new PopupForDeleteCard('#popup_card-delete');
deletePopup.setEventListeners();
//попап для изменения аватара
const avatarPopup = new PopupWithForm('#popup_avatar', {
  submit: (info) => {
    avatarPopup.renderLoading(true);
    const newInfo = { avatar: info.Avatar };
    api.changeAvatar(newInfo)
      .then(() => {
        userInformation.setUserAvatar(info.Avatar);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      })
  }
});
avatarPopup.setEventListeners();
//попап для изменения имени и описания
const editPopup = new PopupWithForm('#popup_edit', {
  submit: (info) => {
    editPopup.renderLoading(true);
    const newInfo = { name: info.Username, description: info.Occupation };
    api.changeUserInfo(newInfo)
      .then(() => {
        userInformation.setUserNameAndDescription(newInfo);
        editPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editPopup.renderLoading(false);
      })
  }
});
editPopup.setEventListeners();
//попап добавления карточки
const addPopup = new PopupWithForm('#popup_add', {
  submit: (info) => {
    addPopup.renderLoading(true);
    const card = { name: info.Placename, link: info.PictureLink };
    api.addNewCard(card)
      .then((res) => {
        const likes = res.likes;
        const owner = res.owner;
        const newCard = createCard(res.link, res.name, likes.length, res._id, owner._id, likes);
        cardsAdding.addNewCard(newCard);
        addPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addPopup.renderLoading(false);
      })
  }
});
addPopup.setEventListeners();
//функция для открытия попапа изменения аватара
function makePopupCangeVisible() {
  avatarPopup.open();
  avatarFormValidator.disableButtonSubmit();
}
//функция для открытия попапа-профиля
function makePopupEditVisible() {
  editPopup.open();
  const info = userInformation.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.description;
  editFormValidator.enableButtonSubmit();
}
//функция для открытия попапа для добавления карточки
function makePopupAddVisible() {
  addPopup.open();
  addFormValidator.disableButtonSubmit();
}
//функция создания карточки
function createCard(imageLink, imageName, numberOfLikes, cardId, ownerId, likesArray) {
  const card = new Card({
    imageLink: imageLink, imageName: imageName,
    numberOfLikes: numberOfLikes, selectorTemplate: elementTemplate,
    cardId: cardId, ownerId: ownerId, likesArray: likesArray,
    popupOpening: (link, name) => { imagePopup.open(link, name) },
    cardDelete: (id) => {
      deletePopup.open();
      deletePopup.setDeleteHandler(() => {
        api.deleteCard(id)
          .then(() => {
            card.deleteCard();
            deletePopup.close();
          })
          .catch((err) => {
            console.log(err);
          })
      })
    },
    toggleLike: (isLiked, cardId) => {
      if (isLiked) {
        api.removeLike(cardId)
          .then((data) => {
            card.handleToggleLike(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api.setLike(cardId)
          .then((data) => {
            card.handleToggleLike(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
  const cardTemplate = card.generateCard(userId);
  return cardTemplate;
}
buttonToEdit.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);
buttonToChange.addEventListener('click', makePopupCangeVisible)

