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
  private eventManager: User;
  private managerName: string;
  private managerId: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.title = 'Event';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.event = new Event().deserialize({});


  }

  ionViewWillEnter() {
    const userId = this.route.snapshot.paramMap.get('userId');
    const eventId = this.route.snapshot.paramMap.get('eventId');
    this.loadEvent(userId, eventId);

  }

  public loadUser(userId) {
    this.authService.loadUser(userId).subscribe(user => {
      this.eventManager = user;
      this.managerName = user.getFullName();
      this.managerId = user.id;
    });
  }


  public loadEvent(userId, eventId) {
    this.authService.loadEvent(userId, eventId).subscribe(event => {
      this.event = event;
      console.log('this.user: ' + userId);
      console.log(this.event);
      this.titleService.setTitle(this.event.name + '\'s ' + this.title + appConstants.APPENDED_TITLE);

      this.loadUser(userId);

      /*      this.profileForm.patchValue({
              email: this.user.email,
            });*/


      /*      Object.keys(this.user).forEach(k => {
              const control = this.profileForm.get(k);
              if (control) {
                control.setValue(this.user[k], {onlySelf: true});
              }
            });*/

    });
  }


}
