import { PageNotFoundPage } from './page-not-found.po';

describe('page not found page', () => {
  let page: PageNotFoundPage;

  beforeEach(() => {
    page = new PageNotFoundPage();
    page.navigateTo();

  });

  it('title should be Page Not Found', () => {
    expect(page.getTitleText()).toContain('Page Not Found');
  });

  it('text should contain sorry', () => {
    expect(page.getHeaderText()).toContain('Sorry');
  });

  it('image should contain oops', () => {
    expect(page.getImageText()).toContain('oops');
  });

});
