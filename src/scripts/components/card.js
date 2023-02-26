class Card {
  constructor(imageLink, imageName, selectorTemplate, {popupOpening}, {deletePopup}, {cardDelete}) {
    this._image = imageLink;
    this._name = imageName;
    this._templateSelector = selectorTemplate;
    this._openPopup = popupOpening;
    this._cardDelete = cardDelete;
    this._deletePopup = deletePopup;
  }
  
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick(like) {
    like.classList.toggle('element__active-like');
  }

  _handleWastebasketClick() {
    this._element.remove();
  }

  _setEventListeners(like) {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deletePopup();
      this._cardDelete(() => {this._handleWastebasketClick()});
    });
    like.addEventListener('click', () => {
      this._handleLikeClick(like);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup(this._image, this._name)
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._setEventListeners(this._likeButton);

    const image = this._element.querySelector('.element__image');
    image.src = this._image;
    image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }
}

export { Card };