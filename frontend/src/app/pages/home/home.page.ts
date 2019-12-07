import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
  ) {
  }


  ngOnInit() {
    this.title = appConstants.APP_TITLE;
    this.titleService.setTitle(appConstants.APP_TITLE);
  }

}





