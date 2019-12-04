import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersPage} from './users.page';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';
import {JwtHelperService} from '@auth0/angular-jwt';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let jwtHelperSpy;
  let jwtHelper: JwtHelperService;
  const bobDoe = {firstName: 'Bob', lastName: 'Doe'};
  const janeDoe = {firstName: 'Jane', lastName: 'Doe'};
  const janeDoer = {firstName: 'Jane', lastName: 'Doer'};
  const aa = {firstName: 'a', lastName: 'a'};
  const ZZ = {firstName: 'Z', lastName: 'Z'};


  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicStorageModule.forRoot(),
      ],
      declarations: [UsersPage],
      providers: [
        {provide: JwtHelperService, useValue: jwtHelperSpy},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
    jwtHelper = TestBed.get(JwtHelperService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sort Bob Doe and Jane Doe', () => {
    const sorted = component.nameSort(bobDoe, janeDoe);
    // -1 since bob < jane
    expect(sorted).toEqual(-1);
  });

  it('should sort Jane Doe and Bob Doe', () => {
    const sorted = component.nameSort(janeDoe, bobDoe);
    // 1 since jane > bob
    expect(sorted).toEqual(1);
  });

  it('should sort Jane Doe and Jane Doer', () => {
    const sorted = component.nameSort(janeDoe, janeDoer);
    // -1 since doe < doer
    expect(sorted).toEqual(-1);
  });

  it('should sort Jane Doer and Jane Doe', () => {
    const sorted = component.nameSort(janeDoer, janeDoe);
    // 1 since doer > doe
    expect(sorted).toEqual(1);
  });

  it('should sort Z and a', () => {
    const sorted = component.nameSort(ZZ, aa);
    // 1 since Z > a
    expect(sorted).toEqual(1);
  });

  it('shouldn\'t sort Jane Doe and Jane Doe', () => {
    const sorted = component.nameSort(janeDoe, janeDoe);
    // 0 since jane doe = jane doe
    expect(sorted).toEqual(0);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
