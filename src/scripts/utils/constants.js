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

export { buttonToEdit, buttonToAdd, nameInput, jobInput, elementTemplate, cardsContainer, validationConfig };