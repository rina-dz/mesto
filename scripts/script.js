const editButton = document.querySelector('.profile__edit-button');
const buttonToAdd = document.querySelector('.profile__add-button');
const buttonToClose = document.querySelectorAll('.popup__close-icon');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const popupImage = document.querySelector('#popup_image');
const imagePopup = document.querySelector('.popup__image');
const descPopup = document.querySelector('.popup__description');
const formElement = document.getElementById('edit_form');
const formImage = document.getElementById('add_form');
const nameInput = document.getElementById('input_name');
const jobInput = document.getElementById('input_job');
const inputPlaceName = document.getElementById('input_placename');
const inputLink = document.getElementById('input_link');
const oldName = document.querySelector('.profile__name');
const oldJob = document.querySelector('.profile__description');
const elementTemplate = document.querySelector('#new_element').content;
const elements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Замок Драхенбург',
    link: './images/SchlossDrachenburg.webp'
  },
  {
    name: 'Замок Вевес',
    link: './images/ThecastleofVêves.webp'
  },
  {
    name: 'Замок Лекке',
    link: './images/LäcköCastle.webp'
  },
  {
    name: 'Замок Нойшванштайн',
    link: './images/NeuschwansteinCastle.webp'
  },
  {
    name: 'Замок Эльц',
    link: './images/EltzCastle.webp'
  },
  {
    name: 'Замок Эйлин Донан',
    link: './images/EileenDonanCastle.webp'
  }
];
//функция для открытия попапа-профиля
function makePopupEditVisible() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = oldName.textContent;
  jobInput.value = oldJob.textContent;
}
//функция для открытия попапа для добавления карточки
function makePopupAddVisible() {
  popupAdd.classList.add('popup_opened');
}
//функция для открытия попапа-картинки
function makePopupImageVisible(evt) {
  const eventTarget = evt.target;
  const elName = eventTarget.parentNode.querySelector('.element__name');
  popupImage.classList.add('popup_opened');
  imagePopup.src = eventTarget.src;
  descPopup.textContent = elName.textContent;
}
//функция для закрытия попапа
function closePopup(evt) {
  const eventTarget = evt.target;
  eventTarget.parentNode.parentNode.classList.remove('popup_opened');
}
//функция для изменения имени и рода деятельности
function handleFormSubmit (evt) {
  evt.preventDefault();
  oldName.textContent = nameInput.value;
  oldJob.textContent = jobInput.value;
  closePopup(evt);
}
//функция для создания новой карточки
function addNewElement (evt) {
  evt.preventDefault();
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = inputLink.value;
  newElement.querySelector('.element__name').textContent = inputPlaceName.value;
  elements.prepend(newElement);
  inputLink.value = '';
  inputPlaceName.value = '';
}
//функция для визуального добавления новой карточки
function makeNexElementVisible (evt) {
  addNewElement(evt);
  closePopup(evt);
}
//функция удаление элемента при нажатии на урну 
function deleteCard(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  eventTarget.parentNode.remove();
}
//функция для добавления карточек через js, а не через html
function addCardsForJS() {
  for(let i = 0; i < initialCards.length; i += 1) {
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = initialCards[i].link;
  card.querySelector('.element__name').textContent = initialCards[i].name;
  elements.append(card);
  }
}
//изменение цвета сердечка при нажатии
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.element__like').forEach(el => {
    el.addEventListener('click', evt => {
      evt.target.classList.toggle('element__active-like');
    });
  });
});
//удаление элемента при нажатии на урну
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.element__trash').forEach(el => {
    el.addEventListener('click', deleteCard);
   });
});
//закрытие попапа
buttonToClose.forEach(el => {
 el.addEventListener('click', closePopup);
});
//открытие картинки на весь экран
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.element__image').forEach(el => {
    el.addEventListener('click', makePopupImageVisible);
  });
});
addCardsForJS();
formElement.addEventListener('submit', handleFormSubmit);
formImage.addEventListener('submit', makeNexElementVisible);
editButton.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);