import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  private title: string;
  private registrationMessages = ValidationMessages;
  private registrationForm: FormGroup;
  private matchingPasswordsGroup: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Register';
    this.titleService.setTitle(this.title + ' | Event-App');


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

  private prepareRegistration(): User {
    const form = this.registrationForm.value;
    form.password = form.matchingPasswords.password;
    form.matchingPasswords = undefined;
    delete form.matchingPasswords;
    return new User().deserialize(form);
  }

  onSubmit() {
    const user = this.prepareRegistration();
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

  }

}
