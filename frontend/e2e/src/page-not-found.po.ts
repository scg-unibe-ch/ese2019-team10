import {browser, by, element} from 'protractor';

export class PageNotFoundPage {
  navigateTo() {
    return browser.get('/page-not-found');
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
