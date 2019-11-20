import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';
import {AuthService} from '../../services/auth.service';

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
  searchCategory: any;

  constructor(
    private titleService: Title,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.title = 'Search';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.foundResult = false;
    this.foundUsers = false;
    this.foundServices = false;
    this.foundEvents = false;
    this.searchCategory = 'everything';

  }

  search(term) {

    document.getElementById('results').textContent = term;

    if (term.length > 0) {

      const searchObject = {
        searchCategory: this.searchCategory,
        searchTerm: term,
      };

      console.log(searchObject);

      this.authService.search(searchObject).subscribe((result: any) => {
        this.searchResult = result;
        this.foundResult = true;
        console.log(result);
      });

    }


  }

}
