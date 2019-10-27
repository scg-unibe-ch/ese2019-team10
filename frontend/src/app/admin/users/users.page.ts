import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private approvedUsers: any;
  private numberApproved: number;
  private loadedAU: boolean;
  private unapprovedUsers: any;
  private numberUnapproved: number;
  private loadedUU: boolean;
  private data: any;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.loadedAU = false;
    this.loadedUU = false;
  }

  showApprovedUsers() {
    this.authService.getApprovedUsers().subscribe((res: any) => {
      this.approvedUsers = res;
      this.numberApproved = res.length;
      this.loadedAU = true;
      console.log(res);
    });
  }

  hideApprovedUsers() {
    this.loadedAU = false;
  }

  showUnapprovedUsers() {
    this.authService.getUnapprovedUsers().subscribe((res: any) => {
      this.unapprovedUsers = res;
      this.numberUnapproved = res.length;
      this.loadedUU = true;
      console.log(res);
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
    this.authService.approveUser(id).subscribe(val => {
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
