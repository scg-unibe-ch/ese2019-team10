import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.title = 'Terms & Conditions';
    this.titleService.setTitle (this.title + appConstants.APPENDED_TITLE);

  }

}
