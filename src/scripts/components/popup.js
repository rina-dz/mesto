class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonToClose = this._popup.querySelector('.popup__close-icon');
        this._closeByEsc = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEsc);
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEsc);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonToClose.addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
              }
        });
    }
}

export { Popup };