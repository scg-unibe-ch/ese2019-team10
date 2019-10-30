import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {LoginUser} from '../../models/login-user.model';
import {ValidationMessages} from '../../models/validation-messages.model';

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
    this.titleService.setTitle (this.title + ' | Event-App');

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  private prepareSave(): LoginUser {
    return new LoginUser().deserialize(this.loginForm.value);
  }

  onSubmit() {
    const user = this.prepareSave();

    console.log(user);
    this.authService.login(user).subscribe(
      (data: any) => {
        console.log(data.msg);
        this.router.navigate(['/', 'dashboard']).then(nav => {
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
/*    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });*/
  }

}
