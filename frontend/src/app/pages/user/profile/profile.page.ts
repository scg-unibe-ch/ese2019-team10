import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {PasswordValidator} from '../../../validators/password.validator';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Event} from '../../../models/event.model';
import {Service} from '../../../models/service.model';
import {appConstants} from '../../../constants/app.constants';
import {KeyValuePair} from '../../../models/key-value-pair.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public title: string;
  public profileForm: FormGroup;
  public matchingPasswordsGroup: FormGroup;
  public countries: Array<string>;
  public genders: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public user: User;
  public services: Service[];
  public events: Event[];
  public serviceList: FormArray;
  public eventList: FormArray;
  private loadedServices: boolean;
  private loadedEvents: boolean;

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
    this.currentTime = new Date();
    this.day = String(this.currentTime.getDate()).padStart(2, '0');
    this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
    this.year = this.currentTime.getFullYear();
    this.services = [];
    this.events = [];
    this.user = new User().deserialize({});
    this.loadedEvents = false;
    this.loadedServices = false;

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

  ionViewWillEnter() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.loadUser(userId);

  }


  public loadUser(userId) {
    this.authService.loadUser(userId).subscribe(user => {
      this.user = user;
      console.log('this.user: ' + userId);
      console.log(this.user);
      this.titleService.setTitle(this.user.firstName + '\'s ' + this.title + appConstants.APPENDED_TITLE);

      if (user.services.length > 0) {
        this.services = this.user.services;
        /*        for (const service of this.user.services) {
                  this.services.push(
                    {key: service.id, value: service.name},
                  );
                }*/
        this.loadedServices = true;
      }

      if (user.events.length > 0) {
        this.events = this.user.events;
        /*        for (const event of this.user.events) {
                  this.events.push(
                    {key: event.id, value: event.name},
                  );
                }*/
        this.loadedEvents = true;
      }


    });
  }


}
