import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-text')).getText();
  }
  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }
}
