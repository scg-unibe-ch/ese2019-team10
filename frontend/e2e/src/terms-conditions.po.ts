import {browser, by, element} from 'protractor';

export class TermsPage {
  navigateTo() {
    return browser.get('/terms-conditions');
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
