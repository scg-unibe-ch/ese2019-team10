import { LoginPage } from './login.po';

describe('login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('title should be Login', () => {
    expect(page.getTitleText()).toContain('Login');
  });

  it('button should be LOGIN', () => {
    expect(page.getButtonText()).toContain('LOGIN');
  });

  it('form should start as invalid', () => {
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('form should stay invalid when clicked', () => {
    const email = page.getEmailInput();
    email.click();
    const password = page.getPasswordInput();
    password.click();
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });

  it('button should start as disabled', () => {
    const loginInput = page.getButton();
    // the following should work but doesn't because disabled is set to "" instead of "true".
    // expect(loginInput.isEnabled()).toBe(false);
    expect(loginInput.getAttribute('aria-disabled')).toEqual('true');
  });

  it('form should be valid when filled out', () => {
    const email = page.getEmailInput();
    email.sendKeys('test@email.com');
    const password = page.getPasswordInput();
    password.sendKeys('aBc123');
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('button should be enabled when form is filled out', () => {
    const email = page.getEmailInput();
    email.sendKeys('example@mail.com');
    const password = page.getPasswordInput();
    password.sendKeys('examplE0');
    const loginInput = page.getButton();
    expect(loginInput.isEnabled()).toBe(true);
  });

  it('form should be invalid when fields are invalidly filled out', () => {
    const email = page.getEmailInput();
    email.sendKeys('test at email dot com');
    const password = page.getPasswordInput();
    password.sendKeys('this is a password');
    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-invalid');
  });


});
