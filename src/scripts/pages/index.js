import './index.css';
import { initialCards } from '../components/cards.js'
import { buttonToEdit, buttonToAdd, nameInput, jobInput, elementTemplate, cardsContainer, validationConfig } from '../utils/constants.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Section } from '../components/section.js';
import { UserInfo } from '../components/UserInfo.js';
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
export { imagePopup };
checkForm(addForm);
checkForm(editForm);
buttonToEdit.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);

