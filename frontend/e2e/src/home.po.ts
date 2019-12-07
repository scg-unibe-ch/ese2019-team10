import { browser, by, element } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get('/home');
  }


  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }
}
