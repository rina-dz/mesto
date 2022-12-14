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
//функция для добавления карточек через js, а не через html 
function addCardsForJS() {
  for(let i = 0; i < initialCards.length; i += 1) {
    elements.append(createCard(initialCards[i].link, initialCards[i].name));
  }
}
//функция для открытия попапа
function openPopup(el) {
  el.classList.add('popup_opened');
}
//функция для закрытия попапа
function closePopup(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.popup').classList.remove('popup_opened');
}
//функция для открытия попапа-профиля
function makePopupEditVisible() {
  openPopup(popupEdit);
  nameInput.value = oldName.textContent;
  jobInput.value = oldJob.textContent;
}
//функция для открытия попапа для добавления карточки
function makePopupAddVisible() {
  openPopup(popupAdd);
}
//функция для открытия попапа-картинки
function makePopupImageVisible(evt) {
  const eventTarget = evt.target;
  const elParent = evt.target.closest('.element');
  const elName = elParent.querySelector('.element__name'); 
  openPopup(popupImage);
  imagePopup.src = eventTarget.src;
  imagePopup.alt = elName.textContent;
  descPopup.textContent = elName.textContent;
}
//функция для изменения имени и рода деятельности
function handleFormSubmit (evt) {
  evt.preventDefault();
  oldName.textContent = nameInput.value;
  oldJob.textContent = jobInput.value;
  closePopup(evt);
}
//функция для добавления новой карточки
function makeNexElementVisible (evt) {
  evt.preventDefault();
  elements.prepend(createCard(inputLink.value, inputPlaceName.value));
  formImage.reset();
  closePopup(evt);
}
//функция удаление элемента при нажатии на урну 
function deleteCard(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  eventTarget.closest('.element').remove();
}
//функция изменения цвета сердечка
function changingLike(evt) {
  evt.target.classList.toggle('element__active-like');
}
//функция создания карточки
function createCard(imageLink, imageName) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = imageLink;
  cardElement.querySelector('.element__image').alt = imageName;
  cardElement.querySelector('.element__name').textContent = imageName;
  //открытие картинки на весь экран
  cardElement.querySelector('.element__image').addEventListener('click', makePopupImageVisible);
  //удаление элемента при нажатии на урну
  cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);
  //изменение цвета сердечка при нажатии
  cardElement.querySelector('.element__like').addEventListener('click', changingLike);
  return cardElement;
}
//закрытие попапа
buttonToClose.forEach(el => {
  el.addEventListener('click', closePopup);
});
addCardsForJS();
formElement.addEventListener('submit', handleFormSubmit);
formImage.addEventListener('submit', makeNexElementVisible);
editButton.addEventListener('click', makePopupEditVisible);
buttonToAdd.addEventListener('click', makePopupAddVisible);