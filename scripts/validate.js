//функция демонстрации ошибки
function showError(input, errorMessage) {
    const inputError = document.querySelector(`#${input.id}-error`);
    inputError.textContent = errorMessage;
    inputError.classList.add('popup__error-visible');
}
//функция скрытия ошибки
function hideError(input) {
    const inputError = document.querySelector(`#${input.id}-error`);
    inputError.textContent = '';
    inputError.classList.remove('popup__error-visible');
}
//функция деактивации кнопки
function offButton(el) {
    const button = el.closest('.form').querySelector('.popup__submit');
    button.classList.add('popup__submit-disabled');
}
//функция активации кнопки
function onButton(el) {
    const button = el.closest('.form').querySelector('.popup__submit');
    button.classList.remove('popup__submit-disabled');
}
//функция для пределения валидности инпутов
function checkInputValidity(el) {
  if (!el.validity.valid) {
    showError(el, el.validationMessage);
    offButton(el);
  } else {
    hideError(el);
    onButton(el);
  }
}
//проверка каждого инпута в форме
function setEventListeners(form) {
    const inputList = Array.from(form.querySelectorAll('.popup__text'));
    inputList.forEach((el) => {
    el.addEventListener('input', function () {
      checkInputValidity(el);
    });
  });
}
//проверка всех форм
function enableValidation() {
    const formList = Array.from(document.forms);
    formList.forEach((el) => {
      el.addEventListener('input', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(el);
    });
}
enableValidation();

