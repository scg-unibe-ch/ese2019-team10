import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  private title: string;
  private loginMessages = ValidationMessages;
  private loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
  ) {
  }


  ngOnInit() {
    this.title = 'Login';
    this.titleService.setTitle(this.title + ' | Event-App');

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.email,
        Validators.maxLength(100)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
      ])),
    });

  }

  private prepareLogin(): User {
    return new User().deserialize(this.loginForm.value);
  }

  onSubmit() {
    let user = new User();
    user = this.prepareLogin();
    console.log(user);
    console.log(typeof user);
    this.authService.login(user).subscribe(
      (data: any) => {
        console.log(data.msg);
        this.router.navigate(['/', 'dashboard']).then(nav => {
          console.log(nav); // true if navigation is successful
        }, err => {
          console.log(err); // when there's an error
        });

        this.alertService.presentToast('You have logged in. Welcome!').then(r => {
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
