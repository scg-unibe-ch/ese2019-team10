import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  loginForm: FormGroup;

  loginMessages = {
    email: [
      { type: 'required', message: 'E-mail is required.' }
      ],
    password: [
      { type: 'required', message: 'Password is required.' }
    ]
  };

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });

  }


  onSubmit(value) {

    console.log(value);
    this.router.navigate(['/', 'registered']).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });

  }

}
