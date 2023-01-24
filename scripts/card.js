import { makePopupImageVisible } from './script.js';

class Card {
  constructor(imageLink, imageName, selectorTemplate) {
    this._image = imageLink;
    this._name = imageName;
    this._templateSelector = selectorTemplate;
  }
  
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick() {
    this._element.querySelector('.element__like').classList.toggle('element__active-like');
  }

  _handleWastebasketClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleWastebasketClick();
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', makePopupImageVisible);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const image = this._element.querySelector('.element__image');
    image.src = this._image;
    image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }
}

export { Card };
