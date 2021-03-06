import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {appConstants} from '../../constants/app.constants';
import {AuthService} from '../../services/auth.service';
import {Service} from '../../models/service.model';
import {Event} from '../../models/event.model';
import {User} from '../../models/user.model';
import {KeyValuePair} from '../../models/key-value-pair.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private title: string;
  private searchResult: any;
  private foundResult: boolean;
  private foundUsers: boolean;
  private foundServices: boolean;
  private foundEvents: boolean;
  private hasSearched: boolean;
  private searchCategory: string;
  private searchAttribute: string;
  public services: Service[];
  public events: Event[];
  public users: User[];
  private showUsers: boolean;
  private showServices: boolean;
  private showEvents: boolean;
  private searchTerm: string;
  public categories: KeyValuePair[];


  constructor(
    private titleService: Title,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.title = 'Search';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.searchCategory = 'everything';
    this.searchAttribute = 'everything';
    this.searchTerm = '';
    this.initialize();
    this.categories = [];
    this.authService.getCategories().subscribe((categories: KeyValuePair[]) => {
      this.categories = categories;
    });
  }

  /**
   * Initialize all variables.
   */
  initialize() {
    this.foundResult = false;
    this.foundUsers = false;
    this.foundServices = false;
    this.foundEvents = false;
    this.hasSearched = false;
    this.showUsers = false;
    this.showServices = false;
    this.showEvents = false;
    this.services = [];
    this.events = [];
    this.users = [];
    this.checkCategoryDisplay();
  }

  /**
   * retrieve the search term from the input box
   */
  getSearchTerm(term: string) {
    this.searchTerm = term;
  }

  /**
   * Search with the provided search term.
   * First create a search object with category, attribute and term. Then query the api and assign the results to the variables.
   */
  search(term) {

    // search term must have at least 1 character
    if (term.length > 0) {
      const searchObject = {
        searchCategory: this.searchCategory,
        searchAttribute: this.searchAttribute,
        searchTerm: term,
      };

      // re-initialize before searching
      this.initialize();

      this.authService.search(searchObject).subscribe((result: any) => {
        this.hasSearched = true;
        this.searchResult = result;

        if (this.searchResult.services.length > 0) {
          this.foundServices = true;
          this.services = this.searchResult.services;
        }
        if (this.searchResult.events.length > 0) {
          this.foundEvents = true;
          this.events = this.searchResult.events;
        }
        if (this.searchResult.users.length > 0) {
          this.foundUsers = true;
          this.users = this.searchResult.users;
        }
        if (this.foundServices || this.foundEvents || this.foundUsers) {
          this.foundResult = true;
        }
      });

    }
  }

  /**
   * Change the search category upon segment change.
   */
  selectCategory(category: string) {
    console.log(this.searchTerm);
    this.searchCategory = category;
    this.searchAttribute = 'everything';
    this.checkCategoryDisplay();
    this.search(this.searchTerm);
  }

  /**
   * Change the search display upon segment change.
   */
  checkCategoryDisplay() {
    if (this.searchCategory === 'everything') {
      this.showEvents = true;
      this.showServices = true;
      this.showUsers = true;
    }
    if (this.searchCategory === 'services') {
      this.showEvents = false;
      this.showServices = true;
      this.showUsers = false;
    }
    if (this.searchCategory === 'events') {
      this.showEvents = true;
      this.showServices = false;
      this.showUsers = false;
    }
    if (this.searchCategory === 'user') {
      this.showEvents = false;
      this.showServices = false;
      this.showUsers = true;
    }
  }

  /**
   * navigate to a service page
   */
  goToService(service) {
    this.router.navigate(['/user/service/', service.id]).then();
  }

  /**
   * navigate to an event page
   */
  goToEvent(event) {
    this.router.navigate(['/user/event/', event.id]).then();
  }

  /**
   * navigate to a user page
   */
  goToUser(user) {
    this.router.navigate(['/user/profile/', user.id]).then();
  }
}
