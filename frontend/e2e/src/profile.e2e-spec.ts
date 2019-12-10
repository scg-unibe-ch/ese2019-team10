import {ProfilePage} from './profile.po';
import {LoginPage} from './login.po';
import {browser, by, element, protractor} from 'protractor';


describe('Profile page', () => {
  let page: ProfilePage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new ProfilePage();
    // page.navigateTo();
    loginPage = new LoginPage();
    loginPage.navigateTo().then(() => {
      loginPage.login().then(() => {
          browser.sleep(1000);
          const EC = protractor.ExpectedConditions;
          browser.wait(EC.urlContains('dashboard'), 5000).then(() => {
            element(by.css('ion-button[routerLink="/profile"]')).click().then(() => {
                browser.wait(EC.urlContains('profile'), 5000);
              }
            );
          });
          browser.sleep(1000);
        }
      );
    });
  });

  it('title should contain Profile', () => {
    expect(page.getTitleText()).toContain('Profile');
  });

  it('save button should contain SAVE', () => {
    expect(page.getSaveButtonText()).toContain('SAVE');
  });

  it('form should start as valid', () => {
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('form should stay valid when clicked', () => {
    const email = page.getEmailInput();
    browser.sleep(1000);
    email.click();
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('form should become invalid when fields are invalidly filled out', () => {
    const email = page.getEmailInput();
    email.clear().then(() => {
      email.sendKeys('test at email dot com');
    });
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('save should save', () => {
    page.save();
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });


});
