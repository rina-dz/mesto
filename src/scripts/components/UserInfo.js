class UserInfo {
    constructor({ userName, userDescription, userAvatar }, userId) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userAvatar = document.querySelector(userAvatar);
        this._userId = userId;
    }

    getUserInfo() {
        const avatarStyle = getComputedStyle(this._userAvatar);
        const nameInfo = this._userName.textContent;
        const descInfo = this._userDescription.textContent;
        const avatarInfo = avatarStyle.backgroundImage.slice(4, -1).replace(/"/g, "");
        const userInfo = { name: nameInfo, description: descInfo, avatar: avatarInfo, _id: this._userId };
        return userInfo;
    }

    setUserAvatar(newAvatar) {
        this._userAvatar.style = `background-image: url(${newAvatar});`;
    }

    setUserNameAndDescription(newInfo) {
        this._userName.textContent = newInfo.name;
        this._userDescription.textContent = newInfo.description;
    }

    setUserInfo(newInfo) {
        this._userName.textContent = newInfo.name;
        this._userDescription.textContent = newInfo.description;
        this._userAvatar.style = `background-image: url(${newInfo.avatar});`;
        this._userId = newInfo._id;
    }
}

export { UserInfo };