import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  private data: any;
  private firstName: string;
  private lastName: string;

  constructor(
    private authService: AuthService,
    private titleService: Title,
  )  { }

  ngOnInit() {
    this.titleService.setTitle ('Dashboard | Event-App');
  }

  loadData() {
    this.authService.getApprovedUsers().subscribe((res: any) => {
      console.log(res);
      this.firstName = res[0].firstName;
      this.lastName = res[0].lastName;
      this.data = 'Is your name ' + this.firstName + ' ' + this.lastName + '?';
    });
  }

  logout() {
    this.authService.logout();
  }

}
