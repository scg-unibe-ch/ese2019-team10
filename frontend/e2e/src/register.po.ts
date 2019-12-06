import {browser, by, element, protractor} from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/register');
  }

  getButtonText() {
    return element(by.deepCss('app-root ion-button')).getText();
  }

  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }

  getForm() {
    return element(by.css('form[id="registerForm"]'));
  }

  getButton() {
    return element(by.css('ion-button[id="register-button"]'));
  }

  getEmailInput() {
    return element(by.css('ion-input[name="email"] input'));
  }

  getPasswordInput() {
    return element(by.css('ion-input[name="password"] input'));
  }

  getConfirmPasswordInput() {
    return element(by.css('ion-input[name="confirmPassword"] input'));
  }

  getFirstNameInput() {
    return element(by.css('ion-input[name="firstName"] input'));
  }

  getLastNameInput() {
    return element(by.css('ion-input[name="lastName"] input'));
  }

  getTerms() {
    return element(by.css('ion-checkbox[name="terms"]'));
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  register() {
    const email = this.getEmailInput();
    const random = this.getRandomIntInclusive(1000, 1000000);
    email.sendKeys(random.toString() + 'e@mail.com');
    const password = this.getPasswordInput();
    password.sendKeys('examplE0');
    const confirmPassword = this.getConfirmPasswordInput();
    confirmPassword.sendKeys('examplE0');
    const firstName = this.getFirstNameInput();
    firstName.sendKeys('Jane');
    const lastName = this.getLastNameInput();
    lastName.sendKeys('Doe');
    const terms = this.getTerms();
    terms.click();
    const input = this.getButton();
    input.click();

  }

}
