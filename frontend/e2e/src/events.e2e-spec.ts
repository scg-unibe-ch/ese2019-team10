import {EventsPage} from './events.po';
import {LoginPage} from './login.po';
import {browser, by, element, protractor} from 'protractor';


describe('Events page', () => {
  let page: EventsPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    page = new EventsPage();
    // page.navigateTo();
    loginPage = new LoginPage();
    loginPage.navigateTo().then(() => {
      loginPage.login().then(() => {
          browser.sleep(1000);
          const EC = protractor.ExpectedConditions;
          browser.wait(EC.urlContains('dashboard'), 5000).then(() => {
            element(by.css('ion-button[routerLink="/profile/events"]')).click().then(() => {
                browser.wait(EC.urlContains('events'), 5000);
              }
            );
          });
          browser.sleep(1000);
        }
      );
    });
  });

  it('title should contain Events', () => {
    expect(page.getTitleText()).toContain('Events');
  });

  it('add button should contain ADD', () => {
    expect(page.getAddButtonText()).toContain('ADD');
  });

  it('form should start as invalid', () => {
    const add = page.getAddButton();
    browser.actions().mouseMove(add).perform();
    add.click();
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should stay invalid when clicked', () => {
    const add = page.getAddButton();
    add.click();
    const name = page.getNameInput();
    name.click().then();
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should stay invalid when fields are incompletely filled out', () => {
    const add = page.getAddButton();
    add.click();
    const name = page.getNameInput();
    name.sendKeys('a good event');
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should become valid when fields are completely filled out', () => {
    const add = page.getAddButton();
    add.click();
    const name = page.getNameInput();
    name.sendKeys('a good event');
    const place = page.getPlaceInput();
    place.sendKeys('a good place');
    const date = page.getDateInput();
    date.sendKeys('a good date');
    const description = page.getDescriptionInput();
    description.sendKeys('a good description');
    const form = page.getAddForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('save should save', () => {
    page.save();
  });


});
