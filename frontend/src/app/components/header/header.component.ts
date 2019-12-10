import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})


export class HeaderComponent implements OnInit {
  loggedIn = false;
  onLogin = false;
  onSearch = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  @Input()
  title: any;


  ngOnInit() {
    this.onLogin = window.location.href.includes('login');
    this.onSearch = window.location.href.includes('search');

    this.authService.authenticationState.subscribe(state => {
      this.loggedIn = state;
    });

  }

  goToLogin() {
    this.router.navigate(['/login']).then();
  }

  goToSearch() {
    this.router.navigate(['/search']).then();
  }

}
