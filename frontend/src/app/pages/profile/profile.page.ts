import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private title: string;
  profileForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  countries: Array<string>;
  genders: Array<string>;
  day = null;
  month = null;
  year = null;
  currentTime = null;
  validationMessages = ValidationMessages;

  constructor(
    public formBuilder: FormBuilder,
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

    // this.authService.loadProfile();

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
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl('', Validators.required),
      birthday: new FormControl(null, Validators.required),
      street: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      matchingPasswords: this.matchingPasswordsGroup,
      serviceProvider: new FormControl(false),
      eventManager: new FormControl(false),
    });
  }

  onSubmit() {
    const user = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.matchingPasswords.password,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      gender: this.profileForm.value.gender,
      birthday: this.profileForm.value.birthday,
      street: this.profileForm.value.street,
      city: this.profileForm.value.city,
      postalCode: this.profileForm.value.postalCode,
      country: this.profileForm.value.country,
      serviceProvider: this.profileForm.value.serviceProvider,
      eventManager: this.profileForm.value.eventManager,
    };
    console.log(user);

    /*this.authService.saveProfile(user).subscribe(
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
    );*/
  }

}
