import {Component, OnInit} from '@angular/core';
import { FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';


import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Event} from '../../../models/event.model';
import {Service} from '../../../models/service.model';
import {appConstants} from '../../../constants/app.constants';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public title: string;
  public countries: Array<string>;
  public genders: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public user: User;
  public services: Service[];
  public events: Event[];
  private servicesLoaded: boolean;
  private eventsLoaded: boolean;
  private profileLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.title = 'Profile';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.user = new User().deserialize({});
    this.services = [];
    this.events = [];
    this.eventsLoaded = false;
    this.servicesLoaded = false;
    this.profileLoaded = false;

    this.countries = [
      'Switzerland',
      'Liechtenstein',
      'Other'
    ];
    this.genders = [
      'Male',
      'Female',
      'Other'
    ];
  }

  /**
   * Before entering the page, get id from url, then load user.
   */
  ionViewWillEnter() {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.loadUser(userId);
  }

  /**
   * Load the user with the given id.
   */
  public loadUser(userId) {
    this.authService.loadUser(userId).subscribe(user => {
      this.user = user;
      this.titleService.setTitle(this.user.getFullName() + '\'s Profile' + appConstants.APPENDED_TITLE);
      this.title = this.user.getFullName() + '\'s Profile';
      this.profileLoaded = true;

      if (user.services.length > 0) {
        this.services = this.user.services;
        this.servicesLoaded = true;
      }

      if (user.events.length > 0) {
        this.events = this.user.events;
        this.eventsLoaded = true;
      }

    });
  }


}
