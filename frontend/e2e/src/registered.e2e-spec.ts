import { RegisteredPage } from './registered.po';

describe('Registered page', () => {
  let page: RegisteredPage;

  beforeEach(() => {
    page = new RegisteredPage();
    page.navigateTo();

  });

  it('title should be Welcome', () => {
    expect(page.getTitleText()).toContain('Welcome!');
  });

  it('text should contain Thank you for registering!', () => {
    expect(page.getHeaderText()).toContain('Thank you for registering!');
  });

  it('image should contain welcome', () => {
    expect(page.getImageText()).toContain('welcome');
  });

});
