import {browser, by, element} from 'protractor';

export class DashboardPage {
  navigateTo() {
    return browser.get('/dashboard');
  }

  getTitleText() {
    return element(by.deepCss('app-header[class="dashboard"] ion-title')).getText();
  }

  getLogoutButtonText() {
    return element(by.css('ion-button[id="logout-button"]')).getText();
  }

}
