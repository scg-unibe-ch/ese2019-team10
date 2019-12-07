import {browser, by, element} from 'protractor';

export class AboutPage {
  navigateTo() {
    return browser.get('/about');
  }



  getTitleText() {
    return element(by.deepCss('app-header ion-title')).getText();
  }
}
