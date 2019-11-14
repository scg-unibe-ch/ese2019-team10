import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  private title: string;


  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Search';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);

  }

  search(term) {
    document.getElementById('results').textContent = term;
  }

}
