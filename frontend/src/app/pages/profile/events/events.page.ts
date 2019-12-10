import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Event} from '../../../models/event.model';
import {appConstants} from '../../../constants/app.constants';
import {EventValidation} from '../../../constants/event-validation.constants';
import { UserRequests } from '../services/services.class';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public title: string;
  public countries: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public eventValidation = EventValidation;

  public user: User;
  public events: Event[];
  public eventList: FormArray;
  public loadedEvents: boolean;
  data;
  private savedEvents: FormGroup;
  private showNewEventForm: boolean;
  private newEventForm: FormGroup;
  helperArray: Array<boolean>;
  private serviceRequests: Array<any>;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
  ) {
  }


  ngOnInit() {
    this.title = 'Events';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.serviceRequests = [];
    this.initialize();
  }


  ionViewWillEnter() {
    this.initialize();
    this.loadEvents();
    this.loadRequests();
  }

  initialize() {
    this.events = [];
    this.helperArray = [];
    this.user = new User().deserialize({});
    this.loadedEvents = false;
    this.showNewEventForm = false;
    this.savedEvents = this.formBuilder.group({
      events: this.formBuilder.array([]),
    });
    this.newEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
    });
    this.eventList = this.savedEvents.get('events') as FormArray;
  }

  getProperty(index, property) {
    return this.getControls()[index].value[property];
  }

  getControls() {
    return (this.savedEvents.get('events') as FormArray).controls;
  }

  getValidity(index) {
    return (this.savedEvents.get('events') as FormArray).controls[index].valid;
  }


  createEvent(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      eventId: [''],
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])],
      date: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      place: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
    });
  }

  public addNewEvent() {
    this.showNewEventForm = true;
  }

  public deleteNewEvent(): void {
    this.showNewEventForm = false;
    this.newEventForm.reset();
  }

  private prepareNewEventSave(): Event {
    const form = this.newEventForm.value;
    return new Event().deserialize(form);
  }


  saveNewEvent() {
    const newEvent = this.prepareNewEventSave();
    console.log(newEvent);

    this.authService.saveNewEvent(newEvent).subscribe(
      (data: any) => {
        if (data.msg === 'Event created') {
          this.deleteNewEvent();
          this.initialize();
          this.loadEvents();
        }
        this.alertService.presentToast(data.msg).then();
      },
    );
  }


  public addEvent() {
    this.eventList.push(this.createEvent());
  }

  public deleteEvent(index: number): void {
    const id = this.getProperty(index, 'id');
    const event = {
      eventId: id,
    };
    this.authService.deleteEvent(event).subscribe((data: any) => {
      this.initialize();
      this.loadEvents();
      console.log(data.msg);
      this.alertService.presentToast(data.msg).then();
    });
  }


  public loadEvents() {
    this.authService.loadEvents().subscribe(user => {
      this.events = user.events;
      if (this.events.length > 0) {
        for (const event of this.events) {
          if (event.category) {
            event.categoryId = event.category.id;
          }
          this.addEvent();
          this.helperArray.push(false);
        }
        this.eventList.patchValue(this.events);
        console.log(this.events);
        this.loadedEvents = true;
      }

    });
  }

  public showEvent(index: number): void {
    this.helperArray[index] = true;
  }

  public hideEvent(index: number): void {
    this.helperArray[index] = false;
  }


  private prepareEventSave(index): Event {
    const form = this.savedEvents.value.events[index];
    return new Event().deserialize(form);
  }

  saveEvent(index) {
    const saveEvent = this.prepareEventSave(index);
    console.log(saveEvent);

    this.authService.saveEvent(saveEvent).subscribe(
      (data: any) => {
        console.log(data.msg);

        this.alertService.presentToast(data.msg).then();
      },
    );
  }

  public loadRequests() {
    this.authService.getUserRequests().subscribe(request => {
      this.serviceRequests = this.parseUserRequests(request);
    });
  }

  private parseUserRequests(request: any) {
    const objArrayUserRequest = new Array<any>();
    for (const event of request) {
      for (const eventService of event.eventServices) {
        const objUserRequest = new UserRequests();
        objUserRequest.eventId = eventService.eventId;
        objUserRequest.eventName = event.name;
        objUserRequest.serviceName = eventService.service.name;
        objUserRequest.serviceId = eventService.serviceId;
        objUserRequest.reply = eventService.reply;
        objUserRequest.message = eventService.message;
        objUserRequest.responded = eventService.responded;
        objUserRequest.booked = eventService.booked;
        if (objUserRequest.responded === true &&
          (objUserRequest.booked === false ||
          objUserRequest.booked === null)) {
          objUserRequest.status = 'Rejected';
        }
        if (objUserRequest.responded === false &&
          (objUserRequest.booked === false ||
          objUserRequest.booked === null)) {
          objUserRequest.status = 'Pending';
        }
        if (objUserRequest.booked === true) {
          objUserRequest.status = 'Confirmed';
        }
        objArrayUserRequest.push(objUserRequest);
      }
    }
    return objArrayUserRequest;
  }

  public viewServiceRequest(serviceRequest: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        requestData: JSON.stringify(serviceRequest)
      },
      skipLocationChange: true
    };
    this.router.navigate(['profile/event-request'], navigationExtras);
  }
}
