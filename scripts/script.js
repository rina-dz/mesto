const buttonToEdit = document.querySelector('.profile__edit-button');
const buttonToAdd = document.querySelector('.profile__add-button');
const nameInput = document.getElementById('input_name');
const jobInput = document.getElementById('input_job');
const elementTemplate = document.querySelector('#new_element').content;
const cardsContainer = document.querySelector('.elements');
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit-disabled',
  inputErrorClass: 'popup__text-error',
  errorClass: 'popup__error-visible'
};
const userInformation = new UserInfo({userName: '.profile__name', userDescription: '.profile__description'});
const editForm = new FormValidator(validationConfig, document.querySelector('#edit_form'));
const addForm = new FormValidator(validationConfig, document.querySelector('#add_form'));
const imagePopup = new PopupWithImage('#popup_image');
const editPopup = new PopupWithForm('#popup_edit', {submit: (info) => {
    const newInfo = {name: info.Username, description: info.Occupation};
    userInformation.setUserInfo(newInfo);
}});
const addPopup = new PopupWithForm('#popup_add', {submit: (info) => {
  //const newCard = {name: info.name, link: info.description};
  //const cardsContainer = new Section({items: newCard, 
    //renderer: (card) => {
      //const anotherCard = createCard(card.link, card.name);
      //cardsContainer.addItem(anotherCard);
    //}}, '.elements');
    //cardsContainer.addItem(anotherCard);
  cardsContainer.prepend(createCard(info.PictureLink, info.Placename));
}});

import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './section.js';
import { UserInfo } from './UserInfo.js';
export { imagePopup };
const cardsAdding = new Section({items: initialCards,
  renderer: (card) => {
    const newCard = createCard(card.link, card.name);
    cardsAdding.addItem(newCard);
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
  const card = new Card(imageLink, imageName, elementTemplate);
  const cardTemplate = card.generateCard();
  return cardTemplate;
}
checkForm(addForm);
checkForm(editForm);
buttonToEdit.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);

