import {Component, NgIterable, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../constants/validation-messages.constants';
import {User} from '../../models/user.model';
import {appConstants} from '../../constants/app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  private title: string;
  private loginMessages = ValidationMessages;
  private loginForm: FormGroup;
  private returnUrl: string;
  private error: string;
  // this is to solve a type error
  private emailMessages = ValidationMessages.email as NgIterable<object>;
  private passwordMessages = ValidationMessages.password as NgIterable<object>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
  }

  /**
   * set up title and form and get the return url.
   */
  ngOnInit() {
    this.title = 'Login';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.route.queryParams.subscribe(params => this.returnUrl = params.returnUrl || '/dashboard');

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
      ])),
    });

  }

  /**
   * deserialize the form in preparation for login
   */
  private prepareLogin(): User {
    return new User().deserialize(this.loginForm.value);
  }

  /**
   * Tell authService to login. If successful, go to the return url if it exists.
   */
  onSubmit() {
    const user = this.prepareLogin();
    this.authService.login(user).subscribe(
      () => {
        this.authService.authenticationState.subscribe(state => {
          if (state) {
            this.router.navigateByUrl(this.returnUrl).then();
          }
        });
      // show a quick message
        this.alertService.presentToast('You have logged in. Welcome!').then();
      },
      error => {
        // display an error beneath the login form in the following cases:
        if (error.message.includes('username/password')) {
          this.error = 'Either your username or your password is wrong.';
        } else if (error.message.includes('not approved')) {
          this.error = 'Your account has not yet been approved.';
        } else {
        }
      }
    );

  }

}
