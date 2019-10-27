import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private title: string;

  constructor(
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.title = 'Home';
    this.titleService.setTitle (this.title + ' | Event-App');
  }

}
