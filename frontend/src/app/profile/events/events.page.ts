import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';


import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';
import {Event} from '../../models/event.model';
import {appConstants} from '../../constants/app.constants';


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
  public user: User;
  public events: Event[];
  public serviceList: FormArray;
  public eventList: FormArray;

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
    this.titleService.setTitle (this.title + appConstants.APPENDED_TITLE);

    this.currentTime = new Date();
    this.day = String(this.currentTime.getDate()).padStart(2, '0');
    this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
    this.year = this.currentTime.getFullYear();
    this.events = [];
    this.user = new User().deserialize({});


    this.eventForm = this.formBuilder.group({

      isEventManager: new FormControl(false),
      eventName: new FormControl(''),
      eventCategory: new FormControl(''),

      events: this.formBuilder.array([this.createEvent()]),

    });


    this.eventList = this.eventForm.get('events') as FormArray;
    this.eventList.removeAt(0);


  }

  ionViewWillEnter() {
    this.loadUser();

  }


  get eventGroup() {
    return this.eventForm.get('events') as FormArray;
  }


  createEvent(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
    });
  }



  public addEvent() {
    // this.events.push({name: this.eventForm.value.eventeName, category: this.eventForm.value.eventCategory});
    this.eventList.push(this.createEvent());
    console.log(this.eventForm.value);
  }

  public deleteEvent(index: number): void {
    // this.events.splice(index, 1);
    this.eventList.removeAt(index);
  }

  public loadUser() {
    this.authService.loadProfile().subscribe(user => {
      this.user = user;
      console.log('this.user');
      console.log(this.user);

      /*      this.eventForm.patchValue({
              email: this.user.email,
            });*/

      this.eventForm.patchValue(this.user);

      /*      Object.keys(this.user).forEach(k => {
              const control = this.eventForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }

  private prepareProfileSave(): User {
    const form = this.eventForm.value;

    return new User().deserialize(form);
  }

  onSubmit() {
    const saveUser = this.prepareProfileSave();
    console.log(saveUser);

    this.authService.saveProfile(saveUser).subscribe(
      (data: any) => {
        console.log(data.msg);

        this.alertService.presentToast(data.msg).then(r => {
          console.log(r);
        }, err => {
          console.log(err);
        });
      },
      error => {
        console.log(error);
      },
      () => {
      }
    );
  }

}
