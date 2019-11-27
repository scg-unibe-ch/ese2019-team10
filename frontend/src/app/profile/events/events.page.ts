import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';
import {Event} from '../../models/event.model';
import {appConstants} from '../../constants/app.constants';
import {EventValidation} from '../../constants/event-validation.constants';
import {KeyValuePair} from '../../models/key-value-pair.model';


@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public title: string;
  public eventForm: FormGroup;
  public matchingPasswordsGroup: FormGroup;
  public countries: Array<string>;
  public genders: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public validationMessages = ValidationMessages;
  public eventValidation = EventValidation;
  public categories: KeyValuePair[];

  public user: User;
  public events: Event[];
  public eventList: FormArray;
  public loadedEvents: boolean;
  data;
  private savedEvents: FormGroup;
  private showNewEventForm: boolean;
  private newEventForm: FormGroup;
  private savedEventsForm: FormGroup;
  helperArray: Array<boolean>;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    // private ref: ChangeDetectorRef,
  ) {
  }


  ngOnInit() {
    this.title = 'Events';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);


    this.categories = [
      {key: 1, value: 'Venue'},
      {key: 2, value: 'Objects'},
      {key: 3, value: 'Consumables'},
      {key: 4, value: 'Professional'},
    ];

    this.initialize();
    /* this.currentTime = new Date();
     this.day = String(this.currentTime.getDate()).padStart(2, '0');
     this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
     this.year = this.currentTime.getFullYear();*/
    /*    this.eventForm = this.formBuilder.group({
          isEventProvider: new FormControl(false),
          eventName: new FormControl(''),
          eventCategory: new FormControl(''),
          events: this.formBuilder.array([this.createEvent()]),
        });*/
    /*    this.savedEventsForm = this.formBuilder.group({
          name: ['', Validators.required],
          category: ['', Validators.required],
          description: ['', Validators.required],
          price: ['', Validators.required],
          place: ['', Validators.required],
          availability: ['', Validators.required],
          quantity: ['', Validators.required],
        });*/
    // this.eventList = this.eventForm.get('events') as FormArray;
    // this.eventList.removeAt(0);
  }


  ionViewWillEnter() {
    this.initialize();
    this.loadEvents();
    /*    this.data = [
          {
            category: 'food',
            name: 'appetisers',
            description: 'Lorem ipsum dolor sit amet.',
            price: '250CHF',
            availability: 'Saturday and Sunday, from 8am to 12pm',
            place: 'Zurich',
            quantity: '5 plates of appetisers',
            id: 3,
            show: false,
          },
          {
            category: 'food',
            name: 'assorted cheese',
            description: 'Lorem ipsum dolor sit amet',
            price: '250CHF',
            availability: 'Saturday and Sunday, from 8am to 12pm',
            place: 'Zurich',
            quantity: '5 plates of appetisers',
            id: 66,
            show: false,
          }
        ];
        for (const event of this.data) {
          console.log(event);
          this.addEvent(event);
        }
        this.eventList.patchValue(this.data);*/
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
    // this.events.push({name: this.eventForm.value.eventName, category: this.eventForm.value.eventCategory});
    this.eventList.push(this.createEvent());
    // console.log(this.savedEvents.value);
  }

  public deleteEvent(index: number): void {
    // this.events.splice(index, 1);
    const id = this.getProperty(index, 'id');
    const event = {
      eventId: id,
    };
    // this.eventList.removeAt(index);
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
          // console.log(event);
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


      /*      this.eventForm.patchValue({
              email: this.user.email,
            });*/

      // this.eventForm.patchValue(this.user);

      /*      Object.keys(this.user).forEach(k => {
              const control = this.eventForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }

  public showEvent(index: number): void {
    // this.events.splice(index, 1);
    this.helperArray[index] = true;
    // this.ref.detectChanges();
  }

  public hideEvent(index: number): void {
    // this.events.splice(index, 1);
    this.helperArray[index] = false;
    // this.ref.detectChanges();
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

}
