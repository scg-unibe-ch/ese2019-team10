import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';


import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';
import {Service} from '../../models/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  public title: string;
  public serviceForm: FormGroup;
  public matchingPasswordsGroup: FormGroup;
  public countries: Array<string>;
  public genders: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public validationMessages = ValidationMessages;
  public user: User;
  public services: Service[];
  public events: Event[];
  public serviceList: FormArray;
  public eventList: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Services';
    this.titleService.setTitle(this.title + ' | Event-App');
    this.currentTime = new Date();
    this.day = String(this.currentTime.getDate()).padStart(2, '0');
    this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
    this.year = this.currentTime.getFullYear();
    this.services = [];
    this.user = new User().deserialize({});


    this.serviceForm = this.formBuilder.group({

      isServiceProvider: new FormControl(false),
      serviceName: new FormControl(''),
      serviceCategory: new FormControl(''),

      services: this.formBuilder.array([this.createService()]),

    });

    this.serviceList = this.serviceForm.get('services') as FormArray;
    this.serviceList.removeAt(0);



  }

  ionViewWillEnter() {
    this.loadUser();

  }

  get serviceGroup() {
    return this.serviceForm.get('services') as FormArray;
  }


  createService(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      place: ['', Validators.required],
      availability: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }



  public addService() {
    // this.services.push({name: this.serviceForm.value.serviceName, category: this.serviceForm.value.serviceCategory});
    this.serviceList.push(this.createService());
    console.log(this.serviceForm.value);
  }

  public deleteService(index: number): void {
    // this.services.splice(index, 1);
    this.serviceList.removeAt(index);
  }



  public loadUser() {
    this.authService.loadProfile().subscribe(user => {
      this.user = user;
      console.log('this.user');
      console.log(this.user);

      /*      this.serviceForm.patchValue({
              email: this.user.email,
            });*/

      this.serviceForm.patchValue(this.user);

      /*      Object.keys(this.user).forEach(k => {
              const control = this.serviceForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }

  private prepareProfileSave(): User {
    const form = this.serviceForm.value;

    return new User().deserialize(form);
  }

  onSubmit() {
    const saveUser = this.prepareProfileSave();
    console.log(saveUser);

    this.authService.saveProfile(saveUser).subscribe(
      (data: any) => {
        console.log(data.msg);

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
