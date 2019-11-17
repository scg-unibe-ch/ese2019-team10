import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {AdminService} from '../../services/admin.service';
import {Messages} from '../../models/messages.model';
import {appConstants} from '../../constants/app.constants';
import {User} from '../../models/user.model';


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
  public messages: Array<string> = Messages;
  public userId = undefined;
  private isServiceProvider: boolean;
  private isEventManager: boolean;
  public  user: User;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Dashboard';
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
    this.user = new User().deserialize({});
  }

  ionViewWillEnter() {
    this.userId = null;
    this.isServiceProvider = false;
    this.isEventManager = false;
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadMessage() {
    const randomNumber = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomNumber];
  }

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
    });
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
