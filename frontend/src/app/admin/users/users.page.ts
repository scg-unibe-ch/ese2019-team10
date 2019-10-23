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
  private unapprovedUsers: any;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,

  )  { }

  ngOnInit() {
  }

  loadApprovedUsers() {
    this.authService.getApprovedUsers().subscribe((res: any) => {
      this.approvedUsers = res.msg;
    });
  }

  loadUnapprovedUsers() {
    this.authService.getUnapprovedUsers().subscribe((res: any) => {
      this.unapprovedUsers = res.msg;
      console.log(res.msg);
      this.alertService.presentToast(res.msg).then(r => {
        console.log(r);
      }, err => {
        console.log(err);
      });
    });
  }

}
