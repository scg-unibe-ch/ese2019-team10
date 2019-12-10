import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {AdminService} from '../../../services/admin.service';
import {User} from '../../../models/user.model';
import {appConstants} from '../../../constants/app.constants';

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
    this.titleService.setTitle(this.title + appConstants.APPENDED_TITLE);
  }


  /**
   * Sort by alphabetic order, ascending, first by last name, then by first name.
   * Uses localCompare to avoid problems with unicode sorting.a
   */
  nameSort(a, b) {
    // sort by last name
    const surname = a.lastName.localeCompare(b.lastName);
    if (surname > 0) {
      return 1;
    } else if (surname < 0) {
      return -1;
    } else {
      // if last names are equal, sort by first name
      const name = a.firstName.localeCompare(b.firstName);
      if (name > 0) {
        return 1;
      } else if (name < 0) {
        return -1;
      } else {
        // default case if both are equal
        return 0;
      }
    }
  }

  /**
   * get approved users from backend, sort them and set variables accordingly
   */
  showApprovedUsers() {
    this.adminService.getApprovedUsers().subscribe((users: any) => {
      console.log(users);
      this.approvedUsers = users.sort(this.nameSort);
      this.numberApproved = this.approvedUsers.length;
      this.loadedAU = true;
      console.log(this.approvedUsers);
    });
  }

  /**
   * hide approved users by flipping the boolean
   */
  hideApprovedUsers() {
    this.loadedAU = false;
  }

  /**
   * get unapproved users from backend, sort them and set variables accordingly
   */
  showUnapprovedUsers() {
    this.adminService.getUnapprovedUsers().subscribe((users: any) => {
      this.unapprovedUsers = users.sort(this.nameSort);
      this.numberUnapproved = this.unapprovedUsers.length;
      this.loadedUU = true;
      // console.log(this.unapprovedUsers);
    });
  }

  /**
   * hide unapproved users by flipping the boolean
   */
  hideUnapprovedUsers() {
    this.loadedUU = false;
  }

  /**
   * Approve a user by sending the corresponding user id to the backend.
   * Then show an approval toast.
   */
  approveUser(id, email) {
    this.adminService.approveUser(id).subscribe(() => {
      },
      () => {
      },
      () => {
        console.log('The PUT observable is now completed.');
        this.alertService.presentToast(email + ' has been approved').then();
      }
    );
  }


}
