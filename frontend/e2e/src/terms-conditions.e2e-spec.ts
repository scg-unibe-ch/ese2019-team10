import { TermsPage } from './terms-conditions.po';

describe('Terms & Conditions page', () => {
  let page: TermsPage;

  beforeEach(() => {
    page = new TermsPage();
    page.navigateTo();

  });

  it('title should be Terms & Conditions', () => {
    expect(page.getTitleText()).toContain('Terms & Conditions');
  });

  it('text should contain Our terms matter!', () => {
    expect(page.getHeaderText()).toContain('Our terms matter!');
  });

  it('image should contain books', () => {
    expect(page.getImageText()).toContain('books');
  });

});
