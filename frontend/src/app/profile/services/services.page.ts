import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {PasswordValidator} from '../../validators/password.validator';
import {AuthService} from '../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ValidationMessages} from '../../models/validation-messages.model';
import {User} from '../../models/user.model';
import {Service} from '../../models/service.model';
import {appConstants} from '../../constants/app.constants';


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
  public loadedServices: boolean;
  data;
  private savedServices: FormGroup;
  private showNewServiceForm: boolean;
  private newServiceForm: FormGroup;
  private savedServicesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private ref: ChangeDetectorRef,
  ) {
  }


  ngOnInit() {
    this.title = 'Services';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);

    this.currentTime = new Date();
    this.day = String(this.currentTime.getDate()).padStart(2, '0');
    this.month = String(this.currentTime.getMonth() + 1).padStart(2, '0');
    this.year = this.currentTime.getFullYear();
    this.services = [];
    this.user = new User().deserialize({});
    this.data = [];

    this.loadedServices = false;
    this.showNewServiceForm = false;

    this.savedServices = this.formBuilder.group({
      services: this.formBuilder.array([]),
    });

    this.serviceForm = this.formBuilder.group({

      isServiceProvider: new FormControl(false),
      serviceName: new FormControl(''),
      serviceCategory: new FormControl(''),

      services: this.formBuilder.array([this.createService()]),

    });

    this.newServiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      place: ['', Validators.required],
      availability: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    this.savedServicesForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      place: ['', Validators.required],
      availability: ['', Validators.required],
      quantity: ['', Validators.required],
    });

    // this.serviceList = this.serviceForm.get('services') as FormArray;
    this.serviceList = this.savedServices.get('services') as FormArray;

    // this.serviceList.removeAt(0);


  }

  ionViewWillEnter() {
    this.loadServices();
    this.data = [
      {
        category: 'food',
        name: 'appetisers',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '250CHF',
        availability: 'Saturday and Sunday, from 8am to 12pm',
        place: 'Zurich',
        quantity: '5 plates of appetisers',
        id: 3,
        show: false,
      },
      {
        category: 'food',
        name: 'assorted cheese',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: '250CHF',
        availability: 'Saturday and Sunday, from 8am to 12pm',
        place: 'Zurich',
        quantity: '5 plates of appetisers',
        id: 66,
        show: false,
      }
    ];

    for (const service of this.data) {
      console.log(service);
      this.addService(service);
    }

    this.serviceList.patchValue(this.data);

  }

  getProperty(index, property) {
    return this.getControls()[index].value[property];
  }

  getControls() {
    return (this.savedServices.get('services') as FormArray).controls;
  }


  createService(): FormGroup {
    return this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      place: ['', Validators.required],
      availability: ['', Validators.required],
      quantity: ['', Validators.required],
      show: [false],
    });
  }

  public addNewService() {
    this.showNewServiceForm = true;
  }

  public deleteNewService(): void {
    this.showNewServiceForm = false;
    this.newServiceForm.reset();
  }

  private prepareNewServiceSave(): Service {
    const form = this.newServiceForm.value;
    return new Service().deserialize(form);
  }


  saveNewService() {
    const newService = this.prepareNewServiceSave();
    console.log(newService);

    this.authService.saveNewService(newService).subscribe(
      (data: any) => {
        console.log(data.msg);

        this.alertService.presentToast(data.msg).then();
      },
    );
  }


  public addService(service) {
    // this.services.push({name: this.serviceForm.value.serviceName, category: this.serviceForm.value.serviceCategory});
    this.serviceList.push(this.createService());
    console.log(this.savedServices.value);
  }

  public deleteService(index: number): void {
    // this.services.splice(index, 1);
    this.serviceList.removeAt(index);
    const id = this.getProperty(index, 'id');
    this.authService.deleteService(id).subscribe(() => {

    });
  }


  public loadServices() {
    this.authService.loadServices().subscribe(services => {
      this.services = services;
      console.log(this.services);
      this.loadedServices = true;

      /*      this.serviceForm.patchValue({
              email: this.user.email,
            });*/

      // this.serviceForm.patchValue(this.user);

      /*      Object.keys(this.user).forEach(k => {
              const control = this.serviceForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }

  public showService(index: number): void {
    // this.services.splice(index, 1);
    this.data[index].show = true;
    this.getControls()[index].value.show = true;
    this.ref.detectChanges();
  }

  public hideService(index: number): void {
    // this.services.splice(index, 1);
    this.data[index].show = false;
    this.getControls()[index].value.show = false;
    this.ref.detectChanges();
  }


  private prepareServiceSave(): Service {
    const form = this.newServiceForm.value;
    return new Service().deserialize(form);
  }

  onSubmit() {
    const saveService = this.prepareServiceSave();
    console.log(saveService);

    this.authService.saveProfile(saveService).subscribe(
      (data: any) => {
        console.log(data);
        this.alertService.presentToast(data.msg).then();
        /*        if (data.status === 201) {
                  this.ionViewWillEnter();
                }*/
      }
    );
  }

}
