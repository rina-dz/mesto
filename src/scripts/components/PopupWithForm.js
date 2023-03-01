import { Popup } from './popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, {submit}) {
        super(popupSelector);
        this._submitHandler = submit;
        this._form = this._popup.querySelector('.form');
        this._inputs = this._popup.querySelectorAll('.popup__text');
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
    }

    _getInputValues() {
        this._allInputs = {};
        this._inputs.forEach((input) => {
            this._allInputs[input.name] = input.value;
        });
        return this._allInputs;
    }

    close() {
        this._form.reset();
        super.close();
    }

    loadingButton(buttonText) {
        this._buttonSubmit.disabled = true;
        this._buttonSubmit.textContent = buttonText;
    }

    normalStateButton(buttonText) {
        this._buttonSubmit.disabled = false;
        this._buttonSubmit.textContent = buttonText;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._info = this._getInputValues();
            this._submitHandler(this._info);
            this.close();
        });

    }
}

export { PopupWithForm };