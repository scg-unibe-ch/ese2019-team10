import { HomePage } from './home.po';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
    page.navigateTo();
  });

  it('title should be Eventum', () => {
    expect(page.getTitleText()).toEqual('Eventum');
  });
});
