import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {PasswordValidator} from '../../validators/password.validator';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  registrationForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  countries: Array<string>;
  genders: Array<string>;

  registrationMessages = {
    firstName: [
      {type: 'required', message: 'First name is required.'}
    ],
    lastName: [
      {type: 'required', message: 'Last name is required.'}
    ],
    email: [
      {type: 'required', message: 'E-mail is required.'},
      {type: 'pattern', message: 'Please enter a valid e-mail.'}
    ],
    phone: [
      {type: 'required', message: 'Phone is required.'},
    ],
    gender: [
      {type: 'required', message: 'Gender is required.'},
    ],
    street: [
      {type: 'required', message: 'Street is required.'},
    ],
    zip: [
      {type: 'required', message: 'Zip code is required.'},
      {type: 'pattern', message: 'Please enter a valid zip code.'}
    ],
    city: [
      {type: 'required', message: 'City is required.'},
    ],
    country: [
      {type: 'required', message: 'Country is required.'},
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 5 characters long.'},
      {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Confirm password is required.'}
    ],
    matchingPasswords: [
      {type: 'areEqual', message: 'Password mismatch.'}
    ],
    terms: [
      {type: 'pattern', message: 'You must accept terms and conditions.'}
    ],
  };

  ngOnInit() {
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
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirmPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      matchingPasswords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmit(value) {
    console.log(value);
    this.authService.saveProfile(this.registrationForm.value).subscribe();
    this.router.navigate(['/', 'registered']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }

}
