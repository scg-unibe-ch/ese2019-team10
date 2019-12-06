import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }

  getParagraphText() {
    return element(by.deepCss('app-root ion-text')).getText();
  }
  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }
}
