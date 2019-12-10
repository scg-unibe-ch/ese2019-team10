import {RegisterPage} from './register.po';
import {browser, protractor} from 'protractor';

describe('Register page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
    page.navigateTo();
  });

  it('title should be Register', () => {
    expect(page.getTitleText()).toContain('Register');
  });

  it('button should be REGISTER', () => {
    expect(page.getButtonText()).toContain('REGISTER');
  });

  it('form should be invalid at first', () => {
    const registerForm = page.getForm().getAttribute('class');
    expect(registerForm).toContain('ng-invalid');
  });

  it('form should stay invalid even when clicked', () => {
    const email = page.getEmailInput();
    email.click();
    const password = page.getPasswordInput();
    password.click();
    const registerForm = page.getForm().getAttribute('class');
    expect(registerForm).toContain('ng-invalid');
  });

  it('button should start as disabled', () => {
    const registerInput = page.getButton();
    // the following should work but doesn't because disabled is set to "" instead of "true".
    // expect(loginInput.isEnabled()).toBe(false);
    expect(registerInput.getAttribute('aria-disabled')).toEqual('true');
  });

  it('form should be valid when filled out', () => {
    const email = page.getEmailInput();
    email.sendKeys('test@email.com');
    const password = page.getPasswordInput();
    password.sendKeys('aBc123');
    const confirmPassword = page.getConfirmPasswordInput();
    confirmPassword.sendKeys('aBc123');
    const firstName = page.getFirstNameInput();
    firstName.sendKeys('Jane');
    const lastName = page.getLastNameInput();
    lastName.sendKeys('Doe');
    const terms = page.getTerms();
    terms.click();
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('button should be enabled when form is filled out', () => {
    const email = page.getEmailInput();
    email.sendKeys('example@mail.com');
    const password = page.getPasswordInput();
    password.sendKeys('examplE0');
    const confirmPassword = page.getConfirmPasswordInput();
    confirmPassword.sendKeys('examplE0');
    const firstName = page.getFirstNameInput();
    firstName.sendKeys('Jane');
    const lastName = page.getLastNameInput();
    lastName.sendKeys('Doe');
    const terms = page.getTerms();
    terms.click();
    const loginInput = page.getButton();
    expect(loginInput.isEnabled()).toBe(true);
  });

  it('form should be invalid when fields are invalidly filled out', () => {
    const email = page.getEmailInput();
    email.sendKeys('test at email dot com');
    const password = page.getPasswordInput();
    password.sendKeys('this is a password');
    const confirmPassword = page.getConfirmPasswordInput();
    confirmPassword.sendKeys('this is a password');
    const firstName = page.getFirstNameInput();
    firstName.sendKeys('Jane');
    const lastName = page.getLastNameInput();
    lastName.sendKeys('Doe');
    const terms = page.getTerms();
    terms.click();
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('register should register', () => {
    page.register();
    const EC = protractor.ExpectedConditions;

    browser.wait(EC.urlContains('registered'), 5000).then(result => {
      expect(result).toEqual(true);
    });

  });


});
