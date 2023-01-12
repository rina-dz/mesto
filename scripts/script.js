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
//функция для добавления карточек через js, а не через html 
function addCardsForJS() {
  initialCards.forEach(card => cardsContainer.append(createCard(card.link, card.name)))
}
//закрытие попапа нажатием на оверлей
function closePopupOverlay(evt) {
  const eventTarget = evt.target;
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(eventTarget);
  }
}
//функция для закрытия попапа esc-ом 
function closePopupByEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}
//функция для открытия попапа
function openPopup(el) {
  el.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}
//функция для закрытия попапа
function closePopup(el) {
  el.closest('.popup').classList.remove('popup_opened');
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
  const eventTarget = evt.target;
  oldName.textContent = nameInput.value;
  oldJob.textContent = jobInput.value;
  closePopup(eventTarget);
}
//функция для добавления новой карточки
function makeNexElementVisible (evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  cardsContainer.prepend(createCard(inputLink.value, inputPlaceName.value));
  formImageAdding.reset();
  closePopup(eventTarget);
}
//функция удаление элемента при нажатии на урну 
function handleWastebasketClick(evt) {
  evt.preventDefault();
  const eventTarget = evt.target;
  eventTarget.closest('.element').remove();
}
//функция изменения цвета сердечка
function handleLikeClick(evt) {
  evt.target.classList.toggle('element__active-like');
}
//функция создания карточки
function createCard(imageLink, imageName) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const image = cardElement.querySelector('.element__image');
  image.src = imageLink;
  image.alt = imageName;
  cardElement.querySelector('.element__name').textContent = imageName;
  //открытие картинки на весь экран
  image.addEventListener('click', makePopupImageVisible);
  //удаление элемента при нажатии на урну
  cardElement.querySelector('.element__trash').addEventListener('click', handleWastebasketClick);
  //изменение цвета сердечка при нажатии
  cardElement.querySelector('.element__like').addEventListener('click', handleLikeClick);
  return cardElement;
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