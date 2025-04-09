export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Ensure the correct field names are returned
  getUserInfo() {
    return {
      title: this._nameElement.textContent.trim(), 
      about: this._jobElement.textContent.trim(), 
    };
  }

  // Ensure data is only updated if it's not empty
  setUserInfo({ title, about }) {
    if (title?.trim()) this._nameElement.textContent = title;
    if (about?.trim()) this._jobElement.textContent = about;
  }

  setAvatar({ avatar }) {
    if (avatar?.trim()) this._avatarElement.src = avatar; 
  }
}
