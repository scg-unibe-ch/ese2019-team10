import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
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

  logout() {
    this.authService.logout();
  }

}
