import { Popup } from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submitHandler = submit;
        this._form = this._popup.querySelector('.form');
        this._inputs = this._popup.querySelectorAll('.popup__text');
        this._buttonSubmit = this._popup.querySelector('.popup__submit');
        this._buttonSubmitText = this._buttonSubmit.textContent;
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

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._buttonSubmit.disabled = true;
            this._buttonSubmit.textContent = loadingText;
        } else {
            this._buttonSubmit.disabled = false;
            this._buttonSubmit.textContent = this._buttonSubmitText;

        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._info = this._getInputValues();
            this._submitHandler(this._info);
        });

    }
}

export { PopupWithForm };