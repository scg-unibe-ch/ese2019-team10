import {browser, by, element} from 'protractor';

export class AboutPage {
  navigateTo() {
    return browser.get('/about');
  }


  getParagraphText() {
    return element(by.deepCss('app-root ion-text')).getText();
  }

  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }
}
