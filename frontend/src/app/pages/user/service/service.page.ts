import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Observable} from 'rxjs';
import {appConstants} from '../../../constants/app.constants';
import {Service} from '../../../models/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  public title: string;
  public service: Service;
userId: number;
serviceId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.title = 'Service';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.service = new Service().deserialize({});


  }

  ionViewWillEnter() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.serviceId = Number(this.route.snapshot.paramMap.get('serviceId'));

    this.loadService(this.userId, this.serviceId);

  }


  public loadService(userId, serviceId) {
    this.authService.loadService(userId, serviceId).subscribe(service => {
      this.service = service;
      console.log('this.user: ' + userId);
      console.log(this.service);
      this.titleService.setTitle(this.service.name + '\'s ' + this.title + appConstants.APPENDED_TITLE);

      /*      this.profileForm.patchValue({
              email: this.user.email,
            });*/


      /*      Object.keys(this.user).forEach(k => {
              const control = this.profileForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }

  public bookService() {
    const service = {
      userId: this.userId,
      serviceId: this.service.id,
    };
    this.authService.bookService(service).subscribe(res => {


      /*      this.profileForm.patchValue({
              email: this.user.email,
            });*/


      /*      Object.keys(this.user).forEach(k => {
              const control = this.profileForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }


}
