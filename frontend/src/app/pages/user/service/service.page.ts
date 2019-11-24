import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Observable} from 'rxjs';
import {appConstants} from '../../../constants/app.constants';
import {Service} from '../../../models/service.model';
import {Event} from '../../../models/event.model';
import {ValidationMessages} from '../../../models/validation-messages.model';
import {BookingValidation} from '../../../constants/booking-validation.constants';
import {KeyValuePair} from '../../../models/key-value-pair.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  public title: string;
  public service: Service;
  userId: number;
  serviceId: number;
  private bookingForm: FormGroup;
  private bookingMessages = BookingValidation;
  private viewer: User;
  private viewerIsEventManager: boolean;
  public events: KeyValuePair[];
  private eventsLoaded: boolean;
  private serviceProvider: User;
  private providerName: string;
  private providerId: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.title = 'Service';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.service = new Service().deserialize({});
    this.service.categoryName = '';
    this.eventsLoaded = false;
    this.viewerIsEventManager = false;
    this.events = [];

    this.bookingForm = this.formBuilder.group({
      message: new FormControl('', Validators.compose([
        Validators.maxLength(1000)
      ])),
      eventId: ['', Validators.required],
    });


  }

  ionViewWillEnter() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.serviceId = Number(this.route.snapshot.paramMap.get('serviceId'));
    this.viewerIsEventManager = false;
    this.eventsLoaded = false;
    this.loadService(this.userId, this.serviceId);

    this.checkViewerStatus();


  }


  public loadUser(userId) {
    this.authService.loadUser(userId).subscribe(user => {
      this.serviceProvider = user;
      this.providerName = user.getFullName();
      this.providerId = user.id;
    });
  }


  public loadService(userId, serviceId) {
    this.authService.loadService(userId, serviceId).subscribe(service => {
      this.service = service;
      this.service.categoryName = service.category.name;
      console.log('this.user: ' + userId);
      console.log(this.service);
      this.titleService.setTitle(this.service.name + '\'s ' + this.title + appConstants.APPENDED_TITLE);

      this.loadUser(userId);


      /*      this.profileForm.patchValue({
              email: this.user.email,
            });*/


      /*      Object.keys(this.user).forEach(k => {
              const control = this.profileForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }


  public loadEvents() {
    if (this.viewer.events.length > 0) {
      for (const event of this.viewer.events) {
        this.events.push(
          {key: event.id, value: event.name},
        );
      }
      this.eventsLoaded = true;
    }
  }

  public bookService() {
    const service = {
      userId: this.userId,
      serviceId: this.service.id,
    };
    this.authService.bookService(service).subscribe(res => {


      /*      this.profileForm.patchValue({
              email: this.user.email,
            });*/


      /*      Object.keys(this.user).forEach(k => {
              const control = this.profileForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }


  checkViewerStatus() {
    this.authService.loadProfile().subscribe(user => {
        this.viewer = user;
        this.viewerIsEventManager = user.isEventManager;
        if (this.viewerIsEventManager) {
          this.loadEvents();
        }
        return user.isEventManager;
      },
    );
  }
}
