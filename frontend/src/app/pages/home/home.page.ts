import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ThemeService} from '../../services/theme.service';
import {appConstants} from '../../constants/app.constants';
import {themeConstants} from '../../constants/theme.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
    private theme: ThemeService,
  ) {
  }

  changeTheme(name) {
    this.theme.setTheme(themeConstants[name]);
  }

  ngOnInit() {
    this.title = appConstants.APP_TITLE;
    this.titleService.setTitle(appConstants.APP_TITLE);
  }

}





