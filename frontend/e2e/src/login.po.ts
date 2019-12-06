import {browser, by, element} from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/login');
  }

  getButtonText() {
    return element(by.deepCss('app-root ion-button')).getText();
  }

  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }

  getForm() {
    return element(by.css('form[id="loginForm"]'));
  }

  getButton() {
    return element(by.css('ion-button[id="login-button"]'));
  }

  getEmailInput() {
    return element(by.css('ion-input[name="email"] input'));
  }

  getPasswordInput() {
    return element(by.css('ion-input[name="password"] input'));
  }
}
