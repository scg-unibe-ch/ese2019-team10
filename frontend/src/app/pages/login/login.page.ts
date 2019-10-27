import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {tap} from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
  ) {
  }

  loginForm: FormGroup;

  loginMessages = {
    email: [
      {type: 'required', message: 'E-mail is required.'}
    ],
    password: [
      {type: 'required', message: 'Password is required.'}
    ]
  };

  ngOnInit() {
    this.titleService.setTitle ('Login | Event-App');

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }


  onSubmit(value) {

    console.log(value);
    this.authService.login(this.loginForm.value).subscribe(
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
