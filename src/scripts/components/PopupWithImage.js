import { Popup } from './Popup.js';

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._description = this._popup.querySelector('.popup__description');
    }

    open(imageLink, imageName) {
        this._image.src = imageLink;
        this._image.alt = imageName;
        this._description.textContent = imageName;
        super.open();
    }
}

export { PopupWithImage };