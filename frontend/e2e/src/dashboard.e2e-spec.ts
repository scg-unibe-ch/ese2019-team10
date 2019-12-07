import {DashboardPage} from './dashboard.po';
import {LoginPage} from './login.po';
import {browser, protractor} from 'protractor';


describe('Dashboard page', () => {
  let page: DashboardPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new DashboardPage();
    page.navigateTo();
    loginPage = new LoginPage();
    loginPage.navigateTo(). then(() => {
      loginPage.login().then( () => {
        browser.sleep(1000);
        const EC = protractor.ExpectedConditions;
        browser.wait(EC.urlContains('dashboard'), 5000).then(() => {
        });
        browser.sleep(1000);
        }
      );
    });
  });

  it('title should contain Dashboard', () => {
    expect(page.getTitleText()).toContain('Dashboard');
  });

  it('logout button should contain LOGOUT', () => {
    expect(page.getLogoutButtonText()).toContain('LOGOUT');
  });


});
