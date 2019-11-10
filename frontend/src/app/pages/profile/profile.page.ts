import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd} from '@angular/router';
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
  public title: string;
  public profileForm: FormGroup;
  public matchingPasswordsGroup: FormGroup;
  public countries: Array<string>;
  public genders: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public validationMessages = ValidationMessages;
  public user: User;
  public services: Service[];
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
    this.title = 'Profile';
    this.titleService.setTitle(this.title + ' | Event-App');
    this.currentTime = new Date();
    this.day = String(this.currentTime.getDate()).padStart(2, '0');
    this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
    this.year = this.currentTime.getFullYear();
    this.services = [];
    this.user = new User().deserialize({});

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


    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.maxLength(500),
      ])),
      confirmPassword: new FormControl('', Validators.maxLength(500))
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
      birthday: new FormControl('', Validators.required),
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
    this.serviceList.removeAt(0);
    this.eventList = this.profileForm.get('events') as FormArray;
    this.eventList.removeAt(0);


  }

  ionViewWillEnter() {
    this.loadUser();

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
    this.authService.loadProfile().subscribe(user => {
      this.user = user;
      console.log('this.user');
      console.log(this.user);

      /*      this.profileForm.patchValue({
              email: this.user.email,
            });*/

      this.profileForm.patchValue(this.user);

      /*      Object.keys(this.user).forEach(k => {
              const control = this.profileForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
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
