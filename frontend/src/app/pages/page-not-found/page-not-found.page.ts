import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';


@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
})
export class PageNotFoundPage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Page Not Found';
    this.titleService.setTitle (this.title + appConstants.APPENDED_TITLE);

  }

}
