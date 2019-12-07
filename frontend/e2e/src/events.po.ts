import {browser, by, element} from 'protractor';

export class EventsPage {
  navigateTo() {
    return browser.get('/profile/events');
  }

  getTitleText() {
    return element(by.deepCss('app-header[class="events"] ion-title')).getText();
  }

  getAddButtonText() {
    return element(by.css('ion-button[id="add-button"]')).getText();
  }

  getAddButton() {
    return element(by.css('ion-button[id="add-button"]'));
  }

  getSaveButton() {
    return element(by.css('form[id="newEventForm"] ion-button[id="save-button"]'));
  }

  getAddForm() {
    return element(by.css('form[id="newEventForm"]'));
  }


  getNameInput() {
    return element(by.css('form[id="newEventForm"] ion-input[formControlName="name"] input'));
  }

  getPlaceInput() {
    return element(by.css('form[id="newEventForm"] ion-input[name="place"] input'));
  }

  getDateInput() {
    return element(by.css('form[id="newEventForm"] ion-input[name="date"] input'));
  }

  getDescriptionInput() {
    return element(by.css('form[id="newEventForm"] ion-input[name="description"] input'));
  }

  save() {
    const add = this.getAddButton();
    browser.executeScript('arguments[0].scrollIntoView();', add.getWebElement()).then(() => {
        add.click().then();
      }
    );
    const name = this.getNameInput();
    name.sendKeys('a good event').then();
    const place = this.getPlaceInput();
    place.sendKeys('a good place').then();
    const date = this.getDateInput();
    date.sendKeys('a good date').then();
    const description = this.getDescriptionInput();
    description.sendKeys('a good description').then();
    const input = this.getSaveButton();
    input.click().then();
  }


}
