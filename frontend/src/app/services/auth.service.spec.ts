import {async, getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthService} from './auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IonicStorageModule} from '@ionic/storage';
import {IonicModule} from '@ionic/angular';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';


describe('AuthService', () => {
  let jwtHelperSpy;
  let jwtHelper: JwtHelperService;
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;
  let injector: TestBed;
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});


    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicStorageModule.forRoot(),
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
      providers: [
        {provide: JwtHelperService, useValue: jwtHelperSpy},
        AuthService,
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    jwtHelper = TestBed.get(JwtHelperService);
  }));

  // beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    injector = getTestBed();
    authService = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('isAdmin() should start as false', () => {
    expect(authService.isAdmin()).toBeFalsy();
  });

  it('isAuthenticated() should start as false', () => {
    expect(authService.isAuthenticated()).toBeFalsy();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
