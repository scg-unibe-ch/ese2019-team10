import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

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

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }


  onSubmit(value) {

    console.log(value);
    this.authService.login(this.loginForm.value).subscribe();
/*    this.router.navigate(['/', 'dashboard']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });*/
  }

}
