import {browser, by, element} from 'protractor';

export class ServicesPage {
  navigateTo() {
    return browser.get('/profile/services');
  }

  getTitleText() {
    return element(by.deepCss('app-header[class="services"] ion-title')).getText();
  }

  getAddButtonText() {
    return element(by.css('ion-button[id="addNewServiceButton"]')).getText();
  }

  getAddButton() {
    return element(by.css('ion-button[id="addNewServiceButton"]'));
  }

  getSaveButton() {
    return element(by.css('form[id="newServiceForm"] ion-button[id="save-button"]'));
  }

  getAddForm() {
    return element(by.css('form[id="newServiceForm"]'));
  }


  getNameInput() {
    return element(by.css('form[id="newServiceForm"] ion-input[formControlName="name"] input'));
  }

  getPlaceInput() {
    return element(by.css('form[id="newServiceForm"] ion-input[name="place"] input'));
  }

  getPriceInput() {
    return element(by.css('form[id="newServiceForm"] ion-input[name="price"] input'));
  }

  getQuantityInput() {
    return element(by.css('form[id="newServiceForm"] ion-input[name="quantity"] input'));
  }

  getDescriptionInput() {
    return element(by.css('form[id="newServiceForm"] ion-input[name="description"] input'));
  }

  getCategoryInput() {
    return element(by.css('form[id="newServiceForm"] ion-select[name="categoryId"]'));
  }

  getCategoryOptionInput() {
    // return element(by.css('form[id="newServiceForm"] ion-select-popover'));
    return element.all(by.cssContainingText('.sc-ion-select-popover-md.item', 'Professional')).get(0);
  }

  getAvailabilityInput() {
    return element(by.css('form[id="newServiceForm"] ion-input[name="availability"] input'));
  }

  save() {
    const add = this.getAddButton();
    add.click().then();
    const name = this.getNameInput();
    name.sendKeys('a good event').then();
    const place = this.getPlaceInput();
    place.sendKeys('a good place').then();
    const price = this.getPriceInput();
    price.sendKeys('a good price').then();
    const description = this.getDescriptionInput();
    description.sendKeys('a good description').then();
    const quantity = this.getQuantityInput();
    quantity.sendKeys('a good quantity').then();
    const availability = this.getAvailabilityInput();
    availability.sendKeys('a good availability').then();
    const category = this.getCategoryInput();
    category.click().then();
    browser.sleep(1000).then();
    const option = this.getCategoryOptionInput();
    option.click().then();
    browser.sleep(1000).then();
    const input = this.getSaveButton();
    browser.controlFlow().execute(() => {
      browser.executeScript('arguments[0].scrollIntoView(true)', input.getWebElement()).then(() => {
        input.click().then();
      });
    }).then();
  }


}
