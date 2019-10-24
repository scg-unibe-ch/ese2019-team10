import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private approvedUsers: any;
  private numberApproved: number;
  private unapprovedUsers: any;
  private numberUnapproved: number;
  private data: any;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,

  )  { }

  ngOnInit() {
  this.numberApproved = -1;
  this.numberUnapproved = -1;
  }

  loadApprovedUsers() {
    this.authService.getApprovedUsers().subscribe((res: any) => {
      this.approvedUsers = res;
      this.numberApproved = res.length;
      console.log(res);
    });
  }

  loadUnapprovedUsers() {
    this.authService.getUnapprovedUsers().subscribe((res: any) => {
      this.unapprovedUsers = res;
      this.numberUnapproved = res.length;
      console.log(res);
/*      this.alertService.presentToast(res).then(r => {
        console.log(r);
      }, err => {
        console.log(err);
      });*/
    });
  }

}
