class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  }

  _showError(input, errorMessage) {
    const inputError = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._config.errorClass);
  }

  _hideError(input) {
    const inputError = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(this._config.errorClass);
  }

  disableButtonSubmit() {
    this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = true;
  }

  enableButtonSubmit() {
    this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
    this._buttonSubmit.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButtonSubmit();
    } else {
      this.enableButtonSubmit();
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export { FormValidator };