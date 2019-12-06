import {browser, by, element} from 'protractor';

export class RegisteredPage {
  navigateTo() {
    return browser.get('/registered');
  }

  getHeaderText() {
    return element(by.deepCss('app-root ion-card-title ion-label')).getText();
  }

  getImageText() {
    return element(by.deepCss('app-root ion-img')).getAttribute('src');
  }

  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }
}
