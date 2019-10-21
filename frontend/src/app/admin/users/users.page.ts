import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  private data: any;

  constructor(
    private authService: AuthService,
  )  { }

  ngOnInit() {
  }

  loadUsers() {
    this.authService.getApprovedUsers().subscribe((res: any) => {
      this.data = res.msg;
    });
  }

}
