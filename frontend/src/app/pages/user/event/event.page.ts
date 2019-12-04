import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {tap} from 'rxjs/operators';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {User} from '../../../models/user.model';
import {Observable} from 'rxjs';
import {appConstants} from '../../../constants/app.constants';
import {Event} from '../../../models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public title: string;
  public event: Event;
  public eventManager: User;
  public managerName: string;
  public managerId: number;
  public eventLoaded: boolean;

  constructor(
    private authService: AuthService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.title = 'Event';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.event = new Event().deserialize({});
    this.eventLoaded = false;
  }

  ionViewWillEnter() {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    this.loadEvent(eventId);
  }

  public loadUser(userId) {
    this.authService.loadUser(userId).subscribe(user => {
      this.eventManager = user;
      this.managerName = user.getFullName();
      this.managerId = user.id;
    });
  }


  public loadEvent(eventId) {
    this.authService.loadEvent(eventId).subscribe(event => {
      this.event = event;
      console.log(this.event);
      this.titleService.setTitle(this.event.name + ' | Event' + appConstants.APPENDED_TITLE);
      this.title = this.event.name;
      this.loadUser(this.event.userId);
      this.eventLoaded = true;
    });
  }


}
