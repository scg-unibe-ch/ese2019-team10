import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';

import {PrivacyPolicyPage} from './privacy-policy.page';

describe('PrivacyPolicyPage', () => {
  let component: PrivacyPolicyPage;
  let fixture: ComponentFixture<PrivacyPolicyPage>;
  let jwtHelperSpy;
  let jwtHelper: JwtHelperService;

  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);

    TestBed.configureTestingModule({
      declarations: [PrivacyPolicyPage],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicStorageModule.forRoot(),
      ],
      providers: [
        {provide: JwtHelperService, useValue: jwtHelperSpy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    jwtHelper = TestBed.get(JwtHelperService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
