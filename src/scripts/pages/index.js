import './index.css';
import { initialCards } from '../utils/cards.js'
import { buttonToEdit, buttonToAdd, nameInput, jobInput, elementTemplate, cardsContainer, validationConfig } from '../utils/constants.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/UserInfo.js';
//информация о пользователе и валидация
const userInformation = new UserInfo({userName: '.profile__name', userDescription: '.profile__description'});
const editForm = new FormValidator(validationConfig, document.querySelector('#edit_form'));
const addForm = new FormValidator(validationConfig, document.querySelector('#add_form'));
//попап-картинка
const imagePopup = new PopupWithImage('#popup_image');
imagePopup.setEventListeners();
//попап для изменения имени и описания
const editPopup = new PopupWithForm('#popup_edit', {submit: (info) => {
    const newInfo = {name: info.Username, description: info.Occupation};
    userInformation.setUserInfo(newInfo);
}});
editPopup.setEventListeners();
//попап добавления карточки
const addPopup = new PopupWithForm('#popup_add', {submit: (info) => {
  const card = {name: info.Placename, link: info.PictureLink};
  const newCard = createCard(card.link, card.name);
  cardsAdding.addNewCard(newCard);
}});
addPopup.setEventListeners();
//создание секции для карточек
const cardsAdding = new Section({items: initialCards,
  renderer: (card) => {
    const newCard = createCard(card.link, card.name);
    cardsAdding.addDefaultItems(newCard);
  }}, '.elements');
cardsAdding.renderAllItems();
//функция для валидации формы
function checkForm(form) {
    const check = form.enableValidation();
    return check;
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
function createCard(imageLink, imageName) {
  const card = new Card(imageLink, imageName, elementTemplate, 
    {popupOpening: (link, name) => {imagePopup.open(link, name)}});
  const cardTemplate = card.generateCard();
  return cardTemplate;
}
checkForm(addForm);
checkForm(editForm);
buttonToEdit.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);

