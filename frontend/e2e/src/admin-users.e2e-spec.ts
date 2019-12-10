import {UsersPage} from './admin-users.po';
import {LoginPage} from './login.po';
import {browser, by, element, protractor} from 'protractor';


describe('User Administration page', () => {
  let page: UsersPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new UsersPage();
    // page.navigateTo();
    loginPage = new LoginPage();
    loginPage.navigateTo(). then(() => {
      loginPage.login().then( () => {
        browser.sleep(1000);
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.urlContains('dashboard'), 5000).then(() => {
          element(by.css('ion-button[routerLink="/admin/users"]')).click().then ( () => {
              browser.wait(EC.urlContains('users'), 5000);
            }
          );
        });
        browser.sleep(1000);
        }
      );
    });
  });

  it('text should contain Unapproved Users', () => {
    expect(page.getUnapprovedText()).toContain('Unapproved Users');
  });

  it('text should contain Approved Users', () => {
    expect(page.getApprovedText()).toContain('Approved Users');
  });


});
