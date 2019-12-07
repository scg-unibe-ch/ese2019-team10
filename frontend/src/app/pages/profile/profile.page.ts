import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {PasswordValidator} from '../../validators/password.validator';
import {DateValidator} from '../../validators/date.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../constants/validation-messages.constants';
import {User} from '../../models/user.model';
import {appConstants} from '../../constants/app.constants';


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
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.currentTime = new Date();
    this.day = String(this.currentTime.getDate()).padStart(2, '0');
    this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
    this.year = this.currentTime.getFullYear();
    this.user = new User().deserialize({});

    this.countries = [
      'Austria',
      'France',
      'Germany',
      'Italy',
      'Liechtenstein',
      'Switzerland',
      'USA',
      'Other'
    ];
    this.genders = [
      'Male',
      'Female',
      'Other'
    ];


    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/),
        Validators.minLength(5),
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
        Validators.pattern(/^[^ @]+@[^ @]+\.[^ @]+$/),
        Validators.maxLength(100)
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.maxLength(100)
      ])),
      birthday: new FormControl('', Validators.compose([
        Validators.maxLength(10),
        DateValidator.date,
      ])),
      street: new FormControl('', Validators.compose([
        Validators.maxLength(100)
      ])),
      postalCode: new FormControl('', Validators.compose([
        // postal code should be a number
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(20)
      ])),
      city: new FormControl('', Validators.compose([
        Validators.maxLength(100)
      ])),
      country: new FormControl('', Validators.compose([
        Validators.maxLength(100)
      ])),
      phone: new FormControl('', Validators.compose([
        // a phone number starts with an optional + and consists of digits and spaces
        Validators.pattern('^[+]?[0-9 ]+$'),
        Validators.minLength(3),
        Validators.maxLength(100)
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      isServiceProvider: new FormControl(false),
      isEventManager: new FormControl(false),
    });

  }

  /**
   * Load user data when entering profile.
   */
  ionViewWillEnter() {
    this.loadUser();
  }


  /**
   * Get the saved profile data.
   */
  public loadUser() {
    this.authService.loadProfile().subscribe(user => {
      this.user = user;
      console.log('this.user');
      console.log(this.user);
      this.profileForm.patchValue(this.user);
    });
  }

  /**
   * Get form data and format it.
   */
  private prepareProfileSave(): User {
    const form = this.profileForm.value;
    form.password = form.matchingPasswords.password;
    form.matchingPasswords = undefined;
    delete form.matchingPasswords;
    return new User().deserialize(form);
  }

  /**
   * Save user profile
   */
  onSubmit() {
    const saveUser = this.prepareProfileSave();
    console.log(saveUser);
    this.authService.saveProfile(saveUser).subscribe(
      (data: any) => {
        this.alertService.presentToast(data.msg).then();
      }
    );
  }

}
