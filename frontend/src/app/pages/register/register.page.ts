import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {PasswordValidator} from '../../validators/password.validator';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {tap} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  private title: string;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
  ) {
  }

  registrationForm: FormGroup;
  matchingPasswordsGroup: FormGroup;

  registrationMessages = {
    firstName: [
      {type: 'required', message: 'Your first name is required.'},
      {type: 'maxlength', message: 'Your first name should be less than 100 characters long.'},
    ],
    lastName: [
      {type: 'required', message: 'Your last name is required.'},
      {type: 'maxlength', message: 'Your last name should be less than 100 characters long.'},
    ],
    email: [
      {type: 'required', message: 'Your e-mail address is required.'},
      {type: 'email', message: 'Please enter a valid e-mail address.'},
      {type: 'pattern', message: 'Please enter a valid e-mail address.'},
      {type: 'maxlength', message: 'Your e-mail address must be less than 100 characters long.'}
    ],
    street: [
      {type: 'required', message: 'Your street is required.'},
      {type: 'maxlength', message: 'Your street should be less than 100 characters long.'}
    ],
    city: [
      {type: 'required', message: 'Your city is required.'},
      {type: 'maxlength', message: 'Your city should be less than 100 characters long.'}
    ],
    postalCode: [
      {type: 'required', message: 'Your postal code is required.'},
      {type: 'pattern', message: 'Please enter a valid postal code.'},
      {type: 'maxlength', message: 'Your postal code should be less than 20 characters long.'}
    ],
    password: [
      {type: 'required', message: 'Your password is required.'},
      {type: 'minlength', message: 'Your password must be at least 5 characters long.'},
      {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'},
      {type: 'maxlength', message: 'Your password should be less than 500 characters long.'}
    ],
    confirmPassword: [
      {type: 'required', message: 'Please confirm your password.'}
    ],
    matchingPasswords: [
      {type: 'areEqual', message: 'Your passwords mismatch.'}
    ],
    terms: [
      {type: 'pattern', message: 'You need to accept the terms and conditions.'}
    ],
  };


  ngOnInit() {
    this.title = 'Register';
    this.titleService.setTitle (this.title + ' | Event-App');


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

    this.registrationForm = this.formBuilder.group({
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
      street: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])),
      city: new FormControl('', Validators.compose([
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
      matchingPasswords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmit(value) {
    const user = {
      email: this.registrationForm.value.email,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      password: this.registrationForm.value.matchingPasswords.password,
      street: this.registrationForm.value.street,
      city: this.registrationForm.value.city,
      postalCode: this.registrationForm.value.postalCode,
    };
    console.log(user);
    this.authService.register(user).subscribe(
      (data: any) => {
        console.log(data.msg);
        this.router.navigate(['/', 'registered']).then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err); // when there's an error
        });

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
    /*this.router.navigate(['/', 'registered']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });*/
  }

}
