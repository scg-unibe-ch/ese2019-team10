import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {appConstants} from '../../../constants/app.constants';
import {Service} from '../../../models/service.model';
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
  private servicesLoaded: boolean;


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
    this.initialize();
    this.bookingForm = this.formBuilder.group({
      message: new FormControl('', Validators.compose([
        Validators.maxLength(1000)
      ])),
      eventId: ['', Validators.required],
    });
  }


  initialize() {
    this.title = 'Service';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.service = new Service().deserialize({});
    this.service.categoryName = '';
    this.serviceId = Number(this.route.snapshot.paramMap.get('serviceId'));
    this.viewerIsEventManager = false;
    this.eventsLoaded = false;
    this.servicesLoaded = false;
    this.events = [];
    this.loadService(this.serviceId);
    this.checkViewerStatus();
  }

  ionViewWillEnter() {
    this.initialize();
  }


  public loadUser(userId) {
    this.authService.loadUser(userId).subscribe(user => {
      this.serviceProvider = user;
      this.providerName = user.getFullName();
      this.providerId = user.id;
    });
  }


  public loadService(serviceId) {
    this.authService.loadService(serviceId).subscribe(service => {
      this.service = service;
      this.service.categoryName = service.category.name;
      this.titleService.setTitle(this.service.name + ' | Service' + appConstants.APPENDED_TITLE);
      this.title = this.service.name;
      this.loadUser(this.service.userId);
      this.servicesLoaded = true;
    });
  }


  public loadEvents() {
    if (this.viewer.events.length > 0) {
      for (const event of this.viewer.events) {
        this.events.push(
          {id: event.id, name: event.name},
        );
      }
      this.eventsLoaded = true;
    }
  }

  public bookService() {
    const service = {
      userId: this.userId,
      serviceId: this.service.id,
      eventId: this.bookingForm.value.eventId,
      message: this.bookingForm.value.message,
    };
    this.authService.bookService(service).subscribe(
      (data: any) => {
        console.log(data);
        this.alertService.presentToast(data.msg).then();
      },
    );
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
