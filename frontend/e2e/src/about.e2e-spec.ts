import { AboutPage } from './about.po';

describe('about page', () => {
  let page: AboutPage;

  beforeEach(() => {
    page = new AboutPage();
    page.navigateTo();
  });

  it('title should be About', () => {
    expect(page.getTitleText()).toContain('About');
  });
});
