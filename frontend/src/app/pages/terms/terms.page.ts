import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
    this.titleService.setTitle (this.title + ' | Event-App');

  }

}
