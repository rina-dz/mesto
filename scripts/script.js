const buttonToEdit = document.querySelector('.profile__edit-button');
const buttonToAdd = document.querySelector('.profile__add-button');
const buttonsToClose = document.querySelectorAll('.popup__close-icon');
const popupEdit = document.querySelector('#popup_edit');
const buttonSubmitEdit = popupEdit.querySelector('.popup__submit');
const popupAdd = document.querySelector('#popup_add');
const buttonSubmitAdd = popupAdd.querySelector('.popup__submit');
const popupImage = document.querySelector('#popup_image');
const imagePopup = document.querySelector('.popup__image');
const descriptionPopup = document.querySelector('.popup__description');
const formProfileChanges = document.getElementById('edit_form');
const formImageAdding = document.getElementById('add_form');
const nameInput = document.getElementById('input_name');
const jobInput = document.getElementById('input_job');
const inputPlaceName = document.getElementById('input_placename');
const inputLink = document.getElementById('input_link');
const oldName = document.querySelector('.profile__name');
const oldJob = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('#new_element').content;
const cardsContainer = document.querySelector('.elements');
const popups = Array.from(document.querySelectorAll('.popup'));
import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
export { makePopupImageVisible };
//функция для добавления карточек через js, а не через html 
function addCardsForJS() {
  initialCards.forEach(card => cardsContainer.append(createCard(card.link, card.name)))
}
//закрытие попапа нажатием на оверлей
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.currentTarget);
  }
}
//функция для закрытия попапа esc-ом 
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}
//функция для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}
//функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}
//функция для открытия попапа-профиля
function makePopupEditVisible() {
  openPopup(popupEdit);
  nameInput.value = oldName.textContent;
  jobInput.value = oldJob.textContent;
  enableButtonSubmit(validationConfig, buttonSubmitEdit);
}
//функция для открытия попапа для добавления карточки
function makePopupAddVisible() {
  openPopup(popupAdd);
  disableButtonSubmit(validationConfig, buttonSubmitAdd);
}
//функция для открытия попапа-картинки
function makePopupImageVisible(evt) {
  const eventTarget = evt.target;
  const elParent = evt.target.closest('.element');
  const elName = elParent.querySelector('.element__name'); 
  openPopup(popupImage);
  imagePopup.src = eventTarget.src;
  imagePopup.alt = elName.textContent;
  descriptionPopup.textContent = elName.textContent;
}
//функция для изменения имени и рода деятельности
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  oldName.textContent = nameInput.value;
  oldJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
//функция для добавления новой карточки
function makeNexElementVisible (evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard(inputLink.value, inputPlaceName.value));
  formImageAdding.reset();
  closePopup(popupAdd);
}
//функция создания карточки
function createCard(imageLink, imageName) {
  const card = new Card(imageLink, imageName, elementTemplate);
  const cardTemplate = card.generateCard();
  return cardTemplate;
}
//закрытие попапа
buttonsToClose.forEach(el => {
  el.addEventListener('click', () => {
    const closestPopup = el.closest('.popup');
    closePopup(closestPopup);
  });
});
addCardsForJS();
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupOverlay)
}) 
formProfileChanges.addEventListener('submit', handleProfileFormSubmit);
formImageAdding.addEventListener('submit', makeNexElementVisible);
buttonToEdit.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);