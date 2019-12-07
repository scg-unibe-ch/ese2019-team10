import {browser, by, element} from 'protractor';

export class SearchPage {
  navigateTo() {
    return browser.get('/search');
  }

  getTitleText() {
    return element(by.deepCss('app-header[class="search"] ion-title')).getText();
  }

  getSearchButtonAttribute() {
    return element(by.css('ion-button[id="search-button"] ion-icon')).getAttribute('name');
  }

  getSearchButton() {
    return element(by.css('ion-button[id="search-button"]'));
  }


  getText() {
    return element(by.deepCss('div[id="noResults"]')).getText();

  }

  getSearchInput() {
    return element(by.css('ion-searchbar input'));
  }

}
