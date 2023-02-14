class UserInfo {
    constructor({userName, userDescription}) {
        this._userName = document.querySelector(userName);
        this._userDescription = document.querySelector(userDescription);
    }

    getUserInfo() {
        const nameInfo = this._userName.textContent;
        const descInfo = this._userDescription.textContent
        const userInfo = {name: nameInfo, description: descInfo};
        return userInfo;
    }

    setUserInfo(newInformation) {
        this._userName.textContent = newInformation.name;
        this._userDescription.textContent = newInformation.description;
    }
}

export { UserInfo };