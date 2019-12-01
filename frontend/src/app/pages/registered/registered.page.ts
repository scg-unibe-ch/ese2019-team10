import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';


@Component({
  selector: 'app-registered',
  templateUrl: './registered.page.html',
  styleUrls: ['./registered.page.scss'],
})
export class RegisteredPage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.title = 'Welcome!';
    this.titleService.setTitle (this.title + appConstants.APPENDED_TITLE);

  }

}
