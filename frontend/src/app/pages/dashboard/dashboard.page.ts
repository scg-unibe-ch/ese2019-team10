import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {AdminService} from '../../services/admin.service';
import {Messages} from '../../models/messages.model';


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

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.title = 'Dashboard';
    this.titleService.setTitle(this.title + ' | Event-App');
  }

  ionViewWillEnter() {
    this.userId = null;
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
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userId = user.id;
      console.log(this.userId);
      const message = this.loadMessage();
      this.data = message + ', ' + this.firstName + ' ' + this.lastName + '!';
    });
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

}
