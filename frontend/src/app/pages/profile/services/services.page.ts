import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {Router, NavigationExtras} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Service} from '../../../models/service.model';
import {appConstants} from '../../../constants/app.constants';
import {ServiceValidation} from '../../../constants/service-validation.constants';
import {KeyValuePair} from '../../../models/key-value-pair.model';
import { ServiceRequests, EventServices } from './services.class';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})

export class ServicesPage implements OnInit {
  public title: string;
  public countries: Array<string>;
  public day = null;
  public month = null;
  public year = null;
  public currentTime = null;
  public serviceValidation = ServiceValidation;
  public categories: KeyValuePair[];

  public user: User;
  public services: Service[];
  public events: Event[];
  public serviceList: FormArray;
  public loadedServices: boolean;
  data;
  private savedServices: FormGroup;
  private showNewServiceForm: boolean;
  private newServiceForm: FormGroup;
  private serviceRequests = new Array<ServiceRequests>();
  helperArray: Array<boolean>;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    public navCtrl: NavController
  ) {
  }


  ngOnInit() {
    this.title = 'Services';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.categories = [];

    this.initialize();
  }


  ionViewWillEnter() {
    this.initialize();
    this.loadServices();
    this.loadRequests();
  }

  initialize() {
    this.authService.getCategories().subscribe((categories: KeyValuePair[]) => {
      this.categories = categories;
    });
    this.services = [];
    this.helperArray = [];
    this.user = new User().deserialize({});
    this.loadedServices = false;
    this.showNewServiceForm = false;
    this.savedServices = this.formBuilder.group({
      services: this.formBuilder.array([]),
    });
    this.newServiceForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      place: ['', Validators.required],
      available: [true],
      availability: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.serviceList = this.savedServices.get('services') as FormArray;
  }

  getProperty(index, property) {
    return this.getControls()[index].value[property];
  }

  getControls() {
    return (this.savedServices.get('services') as FormArray).controls;
  }

  getValidity(index) {
    return (this.savedServices.get('services') as FormArray).controls[index].valid;
  }


  createService(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      serviceId: [''],
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      categoryId: ['', Validators.compose([
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])],
      price: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      place: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      availability: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      available: [true],
      quantity: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
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
        if (data.msg === 'Service created') {
          this.deleteNewService();
          this.initialize();
          this.loadServices();
        }
        this.alertService.presentToast(data.msg).then();
      },
    );
  }


  public addService() {
    this.serviceList.push(this.createService());
  }

  public deleteService(index: number): void {
    const id = this.getProperty(index, 'id');
    const service = {
      serviceId: id,
    };
    this.authService.deleteService(service).subscribe((data: any) => {
      this.initialize();
      this.loadServices();
      console.log(data.msg);
      this.alertService.presentToast(data.msg).then();
    });
  }


  public loadServices() {
    this.authService.loadServices().subscribe(user => {
      this.services = user.services;
      if (this.services.length > 0) {
        for (const service of this.services) {
          if (service.category) {
            service.categoryId = service.category.id;
          }
          this.addService();
          this.helperArray.push(false);
        }
        this.serviceList.patchValue(this.services);
        console.log(this.services);
        this.loadedServices = true;

      }

    });
  }

  public showService(index: number): void {
    this.helperArray[index] = true;
  }

  public hideService(index: number): void {
    this.helperArray[index] = false;
  }


  private prepareServiceSave(index): Service {
    const form = this.savedServices.value.services[index];
    return new Service().deserialize(form);
  }

  saveService(index) {
    const saveService = this.prepareServiceSave(index);
    console.log(saveService);

    this.authService.saveService(saveService).subscribe(
      (data: any) => {
        console.log(data.msg);

        this.alertService.presentToast(data.msg).then();
      },
    );
  }

  public loadRequests() {
    this.authService.getRequests().subscribe(request => {
      this.serviceRequests = this.parseRequests(request);
      console.log(this.serviceRequests);
    });
  }

  private parseRequests(request: any) {
    const objArrayServiceRequest = new Array<ServiceRequests>();
    for (const service of request) {
      const objServiceRequest = new ServiceRequests();
      objServiceRequest.serviceId = service.id;
      objServiceRequest.serviceName = service.name;
      for (const eventService of service.eventServices) {
        const eventServices = new EventServices();
        eventServices.eventId = eventService.eventId;
        eventServices.eventName = eventService.event.name;
        eventServices.message = eventService.message;
        eventServices.userName = eventService.event.user.firstName;
        eventServices.userEmail = eventService.event.user.email;
        objServiceRequest.requests.push(eventServices);
      }
      objArrayServiceRequest.push(objServiceRequest);
    }
    return objArrayServiceRequest;
  }

  public viewServiceRequest(request: any, serviceId: number) {
    request.serviceId = serviceId;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        requestData: JSON.stringify(request)
      }
    };
    this.router.navigate(['profile/service-request'], navigationExtras);
  }

}
