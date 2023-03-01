class Card {
  constructor(imageLink, imageName, numberOfLikes, selectorTemplate, {popupOpening}, {deletePopup}, {cardDelete}, {toggleLike}) {
    this._image = imageLink;
    this._name = imageName;
    this._numberOfLikes = numberOfLikes;
    this._templateSelector = selectorTemplate;
    this._openPopup = popupOpening;
    this._cardDelete = cardDelete;
    this._deletePopup = deletePopup;
    this._toggleLike = toggleLike;
  }
  
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeClick(like, likeCounter) {
    like.classList.toggle('element__active-like');
    this._toggleLike(like, likeCounter);
  }

  _handleWastebasketClick() {
    this._element.remove();
  }

  _setEventListeners(like, likeCounter) {
    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._deletePopup();
      this._cardDelete(() => {this._handleWastebasketClick()});
    });
    like.addEventListener('click', () => {
      this._handleLikeClick(like, likeCounter);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup(this._image, this._name)
    });
  }

  generateCard(cardId, userId) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._setEventListeners(this._likeButton, this._likeCounter);

    const likes = this._element.querySelector('.element__like-counter');
    likes.textContent = this._numberOfLikes;

    const image = this._element.querySelector('.element__image');
    image.src = this._image;
    image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    if (cardId !== userId) {
      const trash = this._element.querySelector('.element__trash');
      trash.remove();
    }

    return this._element;
  }
}

export { Card };