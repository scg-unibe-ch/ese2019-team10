import {browser, by, element} from 'protractor';

export class ProfilePage {
  navigateTo() {
    return browser.get('/profile');
  }

  getTitleText() {
    return element(by.deepCss('app-header[class="profile"] ion-title')).getText();
  }

  getSaveButtonText() {
    return element(by.css('ion-button[id="save-button"]')).getText();
  }

  getForm() {
    return element(by.css('form[id="profileForm"]'));
  }

  getSaveButton() {
    return element(by.css('form[id="profileForm"] ion-button[id="save-button"]'));
  }

  getEmailInput() {
    return element(by.css('form[id="profileForm"] ion-input[formControlName="email"] input'));
  }

  getFirstNameInput() {
    return element(by.css('form[id="profileForm"] ion-input[name="firstName"] input'));
  }

  getLastNameInput() {
    return element(by.css('form[id="profileForm"] ion-input[name="lastName"] input'));
  }

  save() {
    const firstName = this.getFirstNameInput();
    firstName.clear().then(() => {
      firstName.sendKeys('Adminus').then();
    });
    const lastName = this.getLastNameInput();
    lastName.clear().then(() => {
      lastName.sendKeys('Adminus').then();
    });
    const input = this.getSaveButton();
    browser.executeScript('arguments[0].scrollIntoView();', input.getWebElement()).then(() => {
        input.click().then();
      }
    );
  }


}
