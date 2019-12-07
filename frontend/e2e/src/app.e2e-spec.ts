import { AppPage } from './app.po';

describe('new app', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be blank', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Welcome');
    expect(page.getTitleText()).toContain('Eventum');

  });
});
