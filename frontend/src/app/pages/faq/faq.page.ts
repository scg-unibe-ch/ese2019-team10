import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
  private title: string;


  constructor(
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Frequently Asked Questions';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
  }

}
