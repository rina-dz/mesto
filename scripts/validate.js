const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit-disabled',
  inputErrorClass: 'popup__text-error',
  errorClass: 'popup__error-visible'
};
//функция демонстрации ошибки
function showError(input, config, errorMessage) {
  const inputError = document.querySelector(`#${input.id}-error`);
  inputError.textContent = errorMessage;
  inputError.classList.add(config.errorClass);
}
//функция скрытия ошибки
function hideError(input, config) {
    const inputError = document.querySelector(`#${input.id}-error`);
    inputError.textContent = '';
    inputError.classList.remove(config.errorClass);
}
//поиск кнопки сабмит
function findButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  return button;
}
//функция деактивации кнопки
function disableButtonSubmit(form, config) {
    const button = findButton(form, config);
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
}
//функция активации кнопки
function enableButtonSubmit(form, config) {
    const button = findButton(form, config);
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
}
//проверка наличия невалидного поля
function hasInvalidInput(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}
//включение и выключение кнопки в зависимости от состояния импутов
function toggleButtonState(form, config) {
  if (hasInvalidInput(form, config)) {
    disableButtonSubmit(form, config);
  } else {
    enableButtonSubmit(form, config);
  }
}
//функция для определения валидности инпутов
function checkInputValidity(input, config) {
  if (!input.validity.valid) {
    showError(input, config, input.validationMessage);
    input.classList.add(config.inputErrorClass);
  } else {
    hideError(input, config);
    input.classList.remove(config.inputErrorClass);
  }
}
//проверка каждого инпута в форме
function setEventListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    toggleButtonState(form, config);
    inputList.forEach((el) => {
    el.addEventListener('input', function () {
      checkInputValidity(el, config);
      toggleButtonState(form, config);
    });
  });
}
//проверка всех форм
function enableValidation(config) {
    const formList = Array.from(document.forms);
    formList.forEach((el) => {
      el.addEventListener('input', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(el, config);
    });
}
enableValidation(validationConfig);