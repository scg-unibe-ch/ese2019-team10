import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {PasswordValidator} from '../../validators/password.validator';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  registrationForm: FormGroup;
  matchingPasswordsGroup: FormGroup;

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
    street: [
      {type: 'required', message: 'Street is required.'},
    ],
    city: [
      {type: 'required', message: 'City is required.'},
    ],
    postalCode: [
      {type: 'required', message: 'Postal code is required.'},
      {type: 'pattern', message: 'Please enter a valid postal code.'}
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
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])),
      matchingPasswords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmit(value) {
    console.log(value);
    this.authService.register(this.registrationForm.value).subscribe();
    this.router.navigate(['/', 'registered']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }

}
