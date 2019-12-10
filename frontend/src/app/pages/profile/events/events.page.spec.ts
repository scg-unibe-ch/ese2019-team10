import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import { FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {EventsPage} from './events.page';

describe('EventsPage', () => {
  let component: EventsPage;
  let fixture: ComponentFixture<EventsPage>;
  let jwtHelperSpy;
  let jwtHelper: JwtHelperService;

  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);

    TestBed.configureTestingModule({
      declarations: [EventsPage],
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

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
