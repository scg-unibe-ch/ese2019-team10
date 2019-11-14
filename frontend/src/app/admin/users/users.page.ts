import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';
import {AdminService} from '../../services/admin.service';
import {User} from '../../models/user.model';
import {appConstants} from '../../constants/app.constants';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class UsersPage implements OnInit {
  private approvedUsers: User[];
  private numberApproved: number;
  private loadedAU: boolean;
  private unapprovedUsers: User[];
  private numberUnapproved: number;
  private loadedUU: boolean;
  private title: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private titleService: Title,
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
    this.loadedAU = false;
    this.loadedUU = false;
    this.title = 'User Administration';
    this.titleService.setTitle (this.title + appConstants.APPENDED_TITLE);
  }

  nameSort(a, b) {
    // sort by last name
    if (a.lastName > b.lastName) {
      return 1;
    }
    if (a.lastName < b.lastName) {
      return -1;
    }
    // if last names are equal, sort by first name
    if (a.firstName > b.firstName) {
      return 1;
    }
    if (a.firstName < b.firstName) {
      return -1;
    }
  }

  showApprovedUsers() {
    this.adminService.getApprovedUsers().subscribe((users: any) => {
      this.approvedUsers = users;
      this.approvedUsers = this.approvedUsers.sort(this.nameSort);
      this.numberApproved = this.approvedUsers.length;
      this.loadedAU = true;
      console.log(this.approvedUsers);
    });
  }

  hideApprovedUsers() {
    this.loadedAU = false;
  }

  showUnapprovedUsers() {
    this.adminService.getUnapprovedUsers().subscribe((users: any) => {
      this.unapprovedUsers = users;
      this.unapprovedUsers = this.unapprovedUsers.sort(this.nameSort);
      this.numberUnapproved = this.unapprovedUsers.length;
      this.loadedUU = true;
      console.log(this.unapprovedUsers);
      /*      this.alertService.presentToast(res).then(r => {
              console.log(r);
            }, err => {
              console.log(err);
            });*/
    });
  }

  hideUnapprovedUsers() {
    this.loadedUU = false;
  }

  approveUser(id, email) {
    console.log(id);
    this.adminService.approveUser(id).subscribe(val => {
        console.log('PUT call successful value returned in body',
          val);
      },
      response => {
        console.log('PUT call in error', response);
      },
      () => {
        console.log('The PUT observable is now completed.');
        this.alertService.presentToast(email + ' has been approved').then(r => {
          console.log(r);
        }, err => {
          console.log(err);
        });
      }
    );
    /*    if (this.loadedAU) {
          this.loadApprovedUsers();
        }

        if (this.loadedUU) {
          this.loadUnapprovedUsers();
        }*/

  }


}
