import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {IonicModule, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Component} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IonicStorageModule} from '@ionic/storage';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';


describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, jwtHelperSpy;
  let jwtHelper: JwtHelperService;

  beforeEach(async(() => {
    statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
    splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', {ready: platformReadySpy});
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);


    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicStorageModule.forRoot(),
      ],
      declarations: [AppComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: StatusBar, useValue: statusBarSpy},
        {provide: SplashScreen, useValue: splashScreenSpy},
        {provide: Platform, useValue: platformSpy},
        {provide: JwtHelperService, useValue: jwtHelperSpy},
        HttpTestingController,
        Component,
      ],
    }).compileComponents();
    jwtHelper = TestBed.get(JwtHelperService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
    expect(statusBarSpy.styleDefault).toHaveBeenCalled();
    expect(splashScreenSpy.hide).toHaveBeenCalled();
  });


});
