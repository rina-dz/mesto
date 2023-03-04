import { Popup } from './Popup.js';

class PopupForDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._deleteButton = this._popup.querySelector('.popup__submit');
    }

    setDeleteHandler(action) {
        this._delete = action;
    }

    setEventListeners() {
        super.setEventListeners();
        this._deleteButton.addEventListener('click', () => {
            this._delete();
        })
    }
}

export { PopupForDeleteCard };