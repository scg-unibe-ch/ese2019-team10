import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import {appConstants} from '../../constants/app.constants';
import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  private title: string;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  @ViewChild('slides', {static: false}) ionSlides: IonSlides;



  constructor(
    private titleService: Title,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.title = appConstants.APP_TITLE;
    this.titleService.setTitle(appConstants.APP_TITLE);

  }

  goToNextSlide() {
    this.ionSlides.slideNext().then();
  }

  goToPreviousSlide() {
    this.ionSlides.slidePrev().then();
  }



  async finish() {
    await this.router.navigateByUrl('/login');
  }

}





