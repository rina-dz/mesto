const editButton = document.querySelector('.profile__edit-button');
const buttonToAdd = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('#popup_edit');
const popupAdd = document.querySelector('#popup_add');
const popupImage = document.querySelector('#popup_image');
const buttonToClose = document.querySelector('.popup__close-icon');
const formElement = document.getElementById('edit_form');
const formImage = document.getElementById('add_form');
const nameInput = document.getElementById('input_name');
const jobInput = document.getElementById('input_job');
const oldName = document.querySelector('.profile__name');
const oldJob = document.querySelector('.profile__description');
const like = document.querySelectorAll('.element__like');
const buttonTrash = document.querySelectorAll('.element__trash');
const elementTemplate = document.querySelector('#new_element').content;
const imageButton = document.querySelector('.element__image');
const imagePopup = document.querySelector('.popup__image');
const descPopup = document.querySelector('.popup__description');
const inputPlaceName = document.getElementById('input_placename');
const inputLink = document.getElementById('input_link');
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
//функция для открытия попапа картинки
function makePopupImageVisible() {
  popupImage.classList.add('popup_opened');
  descPopup.textContent = initialCards.name;
  imagePopup.src = initialCards.link;
}
//функция для закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}
//функция для изменения имени и рода деятельности
function handleFormSubmit (evt) {
  evt.preventDefault();
  oldName.textContent = nameInput.value;
  oldJob.textContent = jobInput.value;
  closePopup()
}
//функция для создания новой карточки
function addNewElement (evt) {
  evt.preventDefault();
  const elements = document.querySelector('.elements');
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = inputLink.value;
  newElement.querySelector('.element__name').textContent = inputPlaceName.value;
  elements.prepend(newElement);
  initialCards.push(`name: $inputPlaceName.value, link: $inputLink.value`);
}

formElement.addEventListener('submit', handleFormSubmit);
formImage.addEventListener('submit', addNewElement);
editButton.addEventListener('click', makePopupEditVisible);
buttonToClose.addEventListener('click', closePopup);
buttonToAdd.addEventListener('click', makePopupAddVisible);
imageButton.addEventListener('click', makePopupImageVisible);
//изменение цвета сердечка при нажатии
like.forEach(el => {
  el.addEventListener('click', evt => {
    evt.target.classList.toggle('element__active-like');
  });
});