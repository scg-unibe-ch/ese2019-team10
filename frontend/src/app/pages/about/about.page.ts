import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.title = 'About';
    this.titleService.setTitle (this.title + ' | Event-App');
  }

}
