import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthInterceptorService} from './auth-interceptor.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IonicStorageModule} from '@ionic/storage';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('AuthInterceptorService', () => {

  let jwtHelperSpy;
  let jwtHelper: JwtHelperService;

  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);

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
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    jwtHelper = TestBed.get(JwtHelperService);
  }));

  // beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.get(AuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
