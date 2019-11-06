import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';

// import {Service} from '../../models/service.model';

interface Service {
  name: string;
  category: string;
}

interface Event {
  name: string;
  category: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  private title: string;
  public profileForm: FormGroup;
  private matchingPasswordsGroup: FormGroup;
  countries: Array<string>;
  genders: Array<string>;
  private day = null;
  private month = null;
  private year = null;
  private currentTime = null;
  private validationMessages = ValidationMessages;
  private user: User;
  services: Service[];
  events: Event[];
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
    this.title = 'Profile';
    this.titleService.setTitle(this.title + ' | Event-App');
    this.currentTime = new Date();
    this.day = this.currentTime.getDate();
    this.month = this.currentTime.getMonth() + 1;
    this.year = this.currentTime.getFullYear();
    this.services = [];

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

    // this.loadUser();

    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.maxLength(500),
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.profileForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.email,
        Validators.pattern('^[^ @]+@[^ @]+\.[^ @]+$'),
        Validators.maxLength(100)
      ])),
      gender: new FormControl('', Validators.required),
      birthday: new FormControl(null, Validators.required),
      street: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      postalCode: new FormControl('', Validators.compose([
        Validators.required,
        // postal codes can have numbers, letters, spaces, and hyphens
        // Validators.pattern('^[A-Za-z0-9- ]+$'),
        Validators.pattern('^[0-9]+$'),
        Validators.maxLength(20)
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      isServiceProvider: new FormControl(false),
      serviceName: new FormControl(''),
      serviceCategory: new FormControl(''),
      isEventManager: new FormControl(false),
      eventName: new FormControl(''),
      eventCategory: new FormControl(''),
      services: this.formBuilder.array([this.createService()]),
      events: this.formBuilder.array([this.createEvent()]),

    });

    this.serviceList = this.profileForm.get('services') as FormArray;
    this.eventList = this.profileForm.get('events') as FormArray;

  }

  get serviceGroup() {
    return this.profileForm.get('services') as FormArray;
  }

  get eventGroup() {
    return this.profileForm.get('events') as FormArray;
  }

  createService(): FormGroup {
    return this.formBuilder.group({
      serviceName: ['', Validators.required],
      serviceCategory: ['', Validators.required],
    });
  }

  createEvent(): FormGroup {
    return this.formBuilder.group({
      eventName: ['', Validators.required],
      eventCategory: ['', Validators.required],
    });
  }

  public addService() {
    // this.services.push({name: this.profileForm.value.serviceName, category: this.profileForm.value.serviceCategory});
    this.serviceList.push(this.createService());
    console.log(this.profileForm.value);
  }

  public deleteService(index: number): void {
    // this.services.splice(index, 1);
    this.serviceList.removeAt(index);
  }

  public addEvent() {
    // this.events.push({name: this.profileForm.value.eventeName, category: this.profileForm.value.eventCategory});
    this.eventList.push(this.createEvent());
    console.log(this.profileForm.value);
  }

  public deleteEvent(index: number): void {
    // this.events.splice(index, 1);
    this.eventList.removeAt(index);

  }

  public loadUser() {
    this.authService.loadProfile().subscribe(user => this.user = user);
  }

  private prepareProfileSave(): User {
    const form = this.profileForm.value;
    form.password = form.matchingPasswords.password;
    form.matchingPasswords = undefined;
    delete form.matchingPasswords;
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
