import {browser, by, element, protractor} from 'protractor';

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

  login() {
    const email = this.getEmailInput();
    return email.sendKeys('admin@mail.com').then(() => {
        const password = this.getPasswordInput();
        password.sendKeys('xugai4nie9ief5AhshaiSh1aequaiy').then( () => {
          const loginInput = this.getButton();
          loginInput.click().then( () => {
            }
          );
          }
        );
      }
    );



  }
}
