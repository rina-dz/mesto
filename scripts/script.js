let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');
let submitButton = document.querySelector('.popup__submit');
let formElement = document.querySelector('.popup__text');
let nameInput  = document.querySelector('.popup__name');
let jobInput  = document.querySelector('.popup__job');

function visiblePopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', visiblePopup);
closeButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let oldName = document.querySelector('.profile__name');
    let oldJob = document.querySelector('.profile__description');
    let newName = nameInput.value;
    let newJjob = jobInput.value;

    oldName.textContent = newName;
    oldJob.textContent = newJjob;
    
    popup.classList.remove('popup_opened');
}

submitButton.addEventListener('click', handleFormSubmit);