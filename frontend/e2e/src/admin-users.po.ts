import {browser, by, element} from 'protractor';

export class UsersPage {
  navigateTo() {
    return browser.get('/admin/users');
  }

  getApprovedText() {
    return element(by.deepCss('app-root ion-card-header[id="approved"] ion-label')).getText();
  }

  getUnapprovedText() {
    return element(by.deepCss('app-root ion-card-header[id="unapproved"] ion-label')).getText();
  }

}
