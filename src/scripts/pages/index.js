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
  baseUrl: 'nomoreparties.co/v1/cohort-60/',
  headers: {
    authorization: '9d97c533-6f82-4668-9816-7bf0cf3c6ccd',
    'Content-Type': 'application/json'
  }
});
//переменная с id пользователя
let userId;
//Загрузка информации о пользователе с сервера
api.getUserInfo()
.then((result) => {
  buttonToChange.style = `background-image: url(${result.avatar});`;
  const info = {name: result.name, description: result.about, _id: result._id};
  userId = result._id;
  userInformation.setUserInfo(info);
  return userId;
});
//информация о пользователе и валидация
const userInformation = new UserInfo({userName: '.profile__name', userDescription: '.profile__description'}, userId);
const editForm = new FormValidator(validationConfig, document.querySelector('#edit_form'));
const addForm = new FormValidator(validationConfig, document.querySelector('#add_form'));
const avatarForm = new FormValidator(validationConfig, document.querySelector('#avatar_form'));
//создание секции для карточек
const cardsAdding = new Section(
  {renderer: (card) => {
    const owner = card.owner;
    const newCard = createCard(card.link, card.name, card.likes, card._id, owner._id, card.likes);
    cardsAdding.addDefaultItems(newCard);
  }}, '.elements');
//отображение карточек с сервера
api.getInitialCards()
  .then((result) => {
    result.forEach(el => {
      const owner = el.owner;
      const newCard = createCard(el.link, el.name, el.likes.length, el._id, owner._id, el.likes);
      cardsAdding.addDefaultItems(newCard);
    })
  })
//попап-картинка
const imagePopup = new PopupWithImage('#popup_image');
imagePopup.setEventListeners();
//попап для удаления карточки
const deletePopup = new PopupForDeleteCard('#popup_card-delete');
deletePopup.setEventListeners();
//попап для изменения аватара
const avatarPopup = new PopupWithForm('#popup_avatar', {submit: (info) => {
  avatarPopup.loadingButton('Сохранение...');
  buttonToChange.style = `background-image: url(${info.Avatar});`;
  api.changeAvatar(info.Avatar)
 .finally (() => {
    avatarPopup.normalStateButton('Сохранить');
})
}});
avatarPopup.setEventListeners();
//попап для изменения имени и описания
const editPopup = new PopupWithForm('#popup_edit', {submit: (info) => {
    editPopup.loadingButton('Сохранение...');
    const newInfo = {name: info.Username, description: info.Occupation};
    userInformation.setUserInfo(newInfo);
    api.changeUserInfo(userInformation.getUserInfo())
   .finally (() => {
      editPopup.normalStateButton('Сохранить');
  })
}});
editPopup.setEventListeners();
//попап добавления карточки
const addPopup = new PopupWithForm('#popup_add', {submit: (info) => {
  addPopup.loadingButton('Сохранение...');
  const card = {name: info.Placename, link: info.PictureLink};
  api.addNewCard(card)
  .then((res) => {
    const likes = res.likes;
    const owner = res.owner;
    const newCard = createCard(res.link, res.name, likes.length, res._id, owner._id, likes);
    cardsAdding.addNewCard(newCard);
  })
  .finally (() => {
    addPopup.normalStateButton('Создать');
  })
}});
addPopup.setEventListeners();
//функция для валидации формы
function checkForm(form) {
    const check = form.enableValidation();
    return check;
}
//функция для открытия попапа изменения аватара
function makePopupCangeVisible() {
  avatarPopup.open();
  avatarForm.disableButtonSubmit();
}
//функция для открытия попапа-профиля
function makePopupEditVisible() {
  editPopup.open();
  const info = userInformation.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.description;
  editForm.enableButtonSubmit();
}
//функция для открытия попапа для добавления карточки
function makePopupAddVisible() {
  addPopup.open();
  addForm.disableButtonSubmit();
}
//функция создания карточки
function createCard(imageLink, imageName, numberOfLikes, cardId, ownerId, likesArray) {
  const card = new Card(imageLink, imageName, numberOfLikes, elementTemplate, cardId, ownerId, likesArray, 
    {popupOpening: (link, name) => {imagePopup.open(link, name)}},
    {cardDelete: (id) => {
      deletePopup.open();
      deletePopup.handleDelete(() => {
          api.deleteCard(id)
          .then(() => {
            deletePopup.close();
            card.handleWastebasketClick();
          })
        }
      )
    }},
    {toggleLike: (like, likeCounter) => {
      api.toggleLike(cardId, like)
      .then((res) => {
        const likesNumber = res.likes;
        likeCounter.textContent = likesNumber.length;
      })
    }});
  const cardTemplate = card.generateCard(userId);
  return cardTemplate;
}
checkForm(addForm);
checkForm(editForm);
checkForm(avatarForm);
buttonToEdit.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);
buttonToChange.addEventListener('click', makePopupCangeVisible)

