import {ServicesPage} from './services.po';
import {LoginPage} from './login.po';
import {browser, by, element, protractor} from 'protractor';


describe('Services page', () => {
  let page: ServicesPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new ServicesPage();
    // page.navigateTo();
    loginPage = new LoginPage();
    loginPage.navigateTo().then(() => {
      loginPage.login().then(() => {
          browser.sleep(1000);
          const EC = protractor.ExpectedConditions;
          browser.wait(EC.urlContains('dashboard'), 5000).then(() => {
            element(by.css('ion-button[routerLink="/profile/services"]')).click().then(() => {
                browser.wait(EC.urlContains('services'), 5000);
              }
            );
          });
          browser.sleep(1000);
        }
      );
    });
  });

  it('title should contain Services', () => {
    expect(page.getTitleText()).toContain('Services');
  });

  it('add button should contain ADD', () => {
    expect(page.getAddButtonText()).toContain('ADD');
  });

  it('form should start as invalid', () => {
    const add = page.getAddButton();
    add.click();
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should stay invalid when clicked', () => {
    const add = page.getAddButton();
    add.click();
    const name = page.getNameInput();
    browser.controlFlow().execute(() => {
      browser.executeScript('arguments[0].scrollIntoView(true)', name.getWebElement());
      name.click();
    });
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should stay invalid when fields are incompletely filled out', () => {
    const add = page.getAddButton();
    add.click();
    const name = page.getNameInput();
    name.sendKeys('a good service');
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should be valid when filled out', () => {
    const add = page.getAddButton();
    add.click();
    const name = page.getNameInput();
    name.sendKeys('a good event').then();
    const place = page.getPlaceInput();
    place.sendKeys('a good place').then();
    const price = page.getPriceInput();
    price.sendKeys('a good price').then();
    const description = page.getDescriptionInput();
    description.sendKeys('a good description').then();
    const quantity = page.getQuantityInput();
    quantity.sendKeys('a good quantity').then();
    const availability = page.getAvailabilityInput();
    availability.sendKeys('a good availability').then();
    const category = page.getCategoryInput();
    category.click().then();
    browser.sleep(1000);
    const option = page.getCategoryOptionInput();
    option.click().then();
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('save should save', () => {
    page.save();
  });


});
