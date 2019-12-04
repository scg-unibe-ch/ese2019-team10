import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {IonicStorageModule} from '@ionic/storage';

import {SearchPage} from './search.page';
import {By} from '@angular/platform-browser';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let jwtHelperSpy;
  let jwtHelper: JwtHelperService;

  beforeEach(async(() => {
    jwtHelperSpy = jasmine.createSpyObj('JwtHelperService', ['hide']);

    TestBed.configureTestingModule({
      declarations: [SearchPage],
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
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // fixture.autoDetectChanges(true);
  });


  it('should call search on button click', () => {
    spyOn(component, 'search');
    const elm = fixture.debugElement.query(By.css('#search-button')).nativeElement;
    elm.click();
    expect(component.search).toHaveBeenCalled();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
