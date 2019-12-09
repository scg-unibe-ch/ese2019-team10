import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRequestPage } from './event-request.page';

describe('EventRequestPage', () => {
  let component: EventRequestPage;
  let fixture: ComponentFixture<EventRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
