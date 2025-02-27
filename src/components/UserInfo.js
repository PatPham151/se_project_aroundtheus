export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Ensure the correct field names are returned
  getUserInfo() {
    return {
      title: this._nameElement.textContent.trim(), // Matches `name='title'`
      about: this._jobElement.textContent.trim(), // Matches `name='about'`
    };
  }

  // Ensure data is only updated if it's not empty
  setUserInfo({ title, about }) {
    if (title?.trim()) this._nameElement.textContent = title;
    if (about?.trim()) this._jobElement.textContent = about;
  }
}
