import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';
import {AuthService} from '../../services/auth.service';
import {Service} from '../../models/service.model';
import {Event} from '../../models/event.model';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private title: string;
  private searchResult: any;
  private foundResult: boolean;
  foundUsers: boolean;
  foundServices: boolean;
  foundEvents: boolean;
  searchCategory: string;
  searchAttribute: string;
  refineSearch: string;
  services: Service[];
  events: Event[];
  users: User[];

  searched: boolean;

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
    this.refineSearch = 'everything';
    this.initialize();
  }

  initialize() {
    this.foundResult = false;
    this.foundUsers = false;
    this.foundServices = false;
    this.foundEvents = false;
    this.services = [];
    this.events = [];
    this.users = [];
  }

  search(term) {

    if (term.length > 0) {

      const searchObject = {
        searchCategory: this.searchCategory,
        searchAttribute: this.searchAttribute,
        searchTerm: term,
      };

      console.log(searchObject);
      this.initialize();

      this.authService.search(searchObject).subscribe((result: any) => {
        this.searched = true;
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

        console.log(result);
      });

    }
  }

  selectCategory(category) {
    console.log(category);
    this.searchCategory = category;
    this.searchAttribute = 'everything';
  }

  goToService(service) {
    this.router.navigate(['/user/service/', service.id]).then();

  }

  goToEvent(event) {
    this.router.navigate(['/user/event/', event.id]).then();
  }

  goToUser(user) {
    this.router.navigate(['/user/profile/', user.id]).then();
  }
}
