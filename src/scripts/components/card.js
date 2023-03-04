class Card {
  constructor({ imageLink, imageName, numberOfLikes, selectorTemplate, cardId, ownerId, likesArray, popupOpening, cardDelete, toggleLike }) {
    this._imageLink = imageLink;
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

  _isLiked(like) {
    if (like.classList.contains('element__active-like')) {
      return true
    } else {
      return false
    }
  }

  handleToggleLike(data) {
    this._likeCounter.textContent = data.likes.length;
    this._likeButton.classList.toggle('element__active-like');
  }

  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
  }

  _isLikedByUser(userId, like) {
    if (this._likesArray.find(el => el._id === userId)) {
      like.classList.add('element__active-like');
    } else {
      like.classList.remove('element__active-like');
    }
  }

  _setEventListeners() {
    this._trash.addEventListener('click', () => {
      this._cardDelete(this._cardId);
    });
    this._likeButton.addEventListener('click', () => {
      this._toggleLike(this._isLiked(this._likeButton), this._cardId);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopup(this._imageLink, this._name)
    });
  }

  generateCard(userId) {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._trash = this._element.querySelector('.element__trash');
    this._image = this._element.querySelector('.element__image');

    this._likeCounter.textContent = this._numberOfLikes;
    this._isLikedByUser(userId, this._likeButton);

    this._image.src = this._imageLink;
    this._image.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    if (userId !== this._ownerId) {
      this._trash.remove();
    }

    this._setEventListeners();

    return this._element;
  }

}

export { Card };