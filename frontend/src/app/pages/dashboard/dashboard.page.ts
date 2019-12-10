import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {WelcomeMessages} from '../../constants/welcome-messages.constants';
import {appConstants} from '../../constants/app.constants';
import {User} from '../../models/user.model';
import {Service} from '../../models/service.model';
import {Event} from '../../models/event.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private data: any;
  private firstName: string = null;
  private lastName: string = null;
  private title: string;
  public messages: Array<string> = WelcomeMessages;
  public userId = undefined;
  private isServiceProvider: boolean;
  private isEventManager: boolean;
  public user: User;
  public services: Service[];
  public events: Event[];
  private servicesLoaded: boolean;
  private eventsLoaded: boolean;

  constructor(
    private authService: AuthService,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Dashboard';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.user = new User().deserialize({});
    this.services = [];
    this.events = [];
    this.eventsLoaded = false;
    this.servicesLoaded = false;
  }

  initialize() {
    this.userId = null;
    this.isServiceProvider = false;
    this.isEventManager = false;
  }

  ionViewWillEnter() {
    this.initialize();
  }

  ionViewDidEnter() {
    this.loadData();
  }

  /**
   * Display a random welcome message.
   */
  loadMessage() {
    const randomNumber = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomNumber];
  }

  /**
   * Load the user data.
   */
  loadData() {
    this.authService.loadProfile().subscribe((user: any) => {
      this.user = user;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userId = user.id;
      this.isServiceProvider = user.isServiceProvider;
      this.isEventManager = user.isEventManager;
      console.log(this.user);
      const message = this.loadMessage();
      this.data = message + ', ' + this.user.firstName + ' ' + this.user.lastName + '!';
      if (user.services.length > 0) {
        this.services = this.user.services;
        this.servicesLoaded = true;
      }
      if (user.events.length > 0) {
        this.events = this.user.events;
        this.eventsLoaded = true;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  ionViewDidLeave() {
    this.initialize();
  }

}
