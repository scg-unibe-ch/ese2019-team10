import { PrivacyPolicyPage } from './privacy-policy.po';

describe('Privacy Policy page', () => {
  let page: PrivacyPolicyPage;

  beforeEach(() => {
    page = new PrivacyPolicyPage();
    page.navigateTo();

  });

  it('title should be Privacy Policy', () => {
    expect(page.getTitleText()).toContain('Privacy Policy');
  });

  it('text should contain Your privacy matters!', () => {
    expect(page.getHeaderText()).toContain('Your privacy matters!');
  });

  it('image should contain door', () => {
    expect(page.getImageText()).toContain('door');
  });

});
