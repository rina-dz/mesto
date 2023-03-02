class Card {
  constructor(imageLink, imageName, numberOfLikes, selectorTemplate, cardId, ownerId, likesArray, {popupOpening}, {cardDelete}, {toggleLike}) {
    this._image = imageLink;
    this._name = imageName;
    this._numberOfLikes = numberOfLikes;
    this._templateSelector = selectorTemplate;
    this._cardId = cardId;
    this._ownerId = ownerId;
    this._likesArray = likesArray;
    this._openPopup = popupOpening;
    this._cardDelete = cardDelete;
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

  handleWastebasketClick() {
    this._element.remove();
  }

  _isLiked(userId, like) {
    if (this._likesArray.find(el => el._id === userId)) {
      like.classList.add('element__active-like');
    } else {
      like.classList.remove('element__active-like');
    }
  }

  _setEventListeners(like, likeCounter, trash) {
    trash.addEventListener('click', () => {
      this._cardDelete(this._cardId);
    });
    like.addEventListener('click', () => {
      this._handleLikeClick(like, likeCounter);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup(this._image, this._name)
    });
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._trash = this._element.querySelector('.element__trash');

    this._likeCounter.textContent = this._numberOfLikes;
    this._isLiked(userId, this._likeButton);

    const image = this._element.querySelector('.element__image');
    image.src = this._image;
    image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    if (userId !== this._ownerId) {
      this._trash.remove();
    }

    this._setEventListeners(this._likeButton, this._likeCounter, this._trash);

    return this._element;
  }

}

export { Card };