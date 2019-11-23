import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {appConstants} from '../../constants/app.constants';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {
  private title: string;


  constructor(
    private titleService: Title,

  ) { }

  ngOnInit() {
    this.title = 'Privacy Policy';
    this.titleService.setTitle (this.title + appConstants.APPENDED_TITLE);

  }

}
