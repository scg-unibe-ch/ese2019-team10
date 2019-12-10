import {SearchPage} from './search.po';
import {LoginPage} from './login.po';
import {browser, by, element, protractor} from 'protractor';


describe('Search page', () => {
  let page: SearchPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new SearchPage();
    // page.navigateTo();
    loginPage = new LoginPage();
    loginPage.navigateTo().then(() => {
      loginPage.login().then(() => {
          browser.sleep(1000);
          const EC = protractor.ExpectedConditions;
          browser.wait(EC.urlContains('dashboard'), 5000).then(() => {
            element(by.css('ion-button[routerLink="/search"]')).click().then(() => {
                browser.wait(EC.urlContains('search'), 5000);
              }
            );
          });
          browser.sleep(1000);
        }
      );
    });
  });

  it('title should contain Search', () => {
    expect(page.getTitleText()).toContain('Search');
  });

  it('search button icon should contain name=search', () => {
    expect(page.getSearchButtonAttribute()).toContain('search');
  });

  it('search ', () => {
    const input = page.getSearchInput();
    input.sendKeys('thissearchwontresultinanythinghopefully');
    const button = page.getSearchButton();
    button.click().then(() => {
        browser.sleep(1000);
        expect(page.getText()).toContain('e');
      }
    );
  });


});
