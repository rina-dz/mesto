class UserInfo {
    constructor({userName, userDescription}, userId) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
        this._userId = userId;
    }

    getUserInfo() {
        const nameInfo = this._userName.textContent;
        const descInfo = this._userDescription.textContent;
        const userInfo = {name: nameInfo, description: descInfo, _id: this._userId};
        return userInfo;
    }

    setUserInfo(newInformation) {
        this._userName.textContent = newInformation.name;
        this._userDescription.textContent = newInformation.description;
        this._userId = newInformation._id;
    }
}

export { UserInfo };