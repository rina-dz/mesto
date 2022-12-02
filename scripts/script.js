const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonToClose = document.querySelector('.popup__close-icon');
const formElement = document.getElementById('edit_form');
const nameInput = document.getElementById('input_name');
const jobInput = document.getElementById('input_job'); 
const oldName = document.querySelector('.profile__name');
const oldJob = document.querySelector('.profile__description');

//функция для открытия попапа
function makePopupVisible() {
    popup.classList.add('popup_opened');
    nameInput.value = oldName.textContent;
    jobInput.value = oldJob.textContent;
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
    
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', makePopupVisible);
buttonToClose.addEventListener('click', closePopup);