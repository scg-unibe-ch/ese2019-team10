import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPage } from './registered.page';

describe('RegisteredPage', () => {
  let component: RegisteredPage;
  let fixture: ComponentFixture<RegisteredPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
