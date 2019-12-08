import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {combineLatest} from 'rxjs';

import {AuthService} from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  rootPage: any = 'HomePage';
  navigate: any;
  loggedIn = false;
  toggle: any;
  prefersDark: any = false;
  isAdmin = false;
  isEventManager = false;
  isServiceProvider = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authService.authenticationState.subscribe(state => {
        console.log('auth state: ' + state);
      });
      this.checkToggle(this.prefersDark.matches);
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.navigate.map(p => {
          return p.active = (event.url === p.url);
        });
      }
    });

    // Query for the toggle that is used to change between themes
    this.toggle = document.querySelector('#themeToggle');

    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    this.toggle.addEventListener('ionChange', (ev) => {
      document.body.classList.toggle('dark', ev.detail.checked);
    });

    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.checkToggle(this.prefersDark.matches);
    document.body.classList.toggle('dark', this.prefersDark.matches);

    console.log('dark');
    console.log(this.prefersDark);

    this.prefersDark.addEventListener('change', (e) => {
      this.checkToggle(e.matches);
    });

  }

  checkToggle(shouldCheck: any) {
    this.toggle.checked = shouldCheck;
  }


  /**
   * log out current user
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Builds the sidebar menu, showing different entries for logged in users, admins, service providers, event users.
   */
  sideMenu() {

    combineLatest([this.authService.authenticationState, this.authService.adminState,
      this.authService.eventManagerState, this.authService.serviceProviderState])
      .subscribe(results => {
        // console.log('combineLatest results:', results);
        // [this.loggedIn, this.isAdmin, this.isEventManager, this.isServiceProvider] = results;
        this.isAdmin = this.authService.isAdmin();
        this.isEventManager = this.authService.isEventManager();
        this.isServiceProvider = this.authService.isServiceProvider();
        this.loggedIn = this.authService.isAuthenticated();

        if (this.loggedIn) {
          this.loggedIn = true;
          this.navigate =
            [
              {
                title: 'Home',
                url: '/home',
                icon: 'home'
              },
              {
                title: 'Dashboard',
                url: '/dashboard',
                icon: 'apps'
              },
              {
                title: 'Profile',
                url: '/profile',
                icon: 'person'
              },
              {
                title: 'Search',
                url: '/search',
                icon: 'search'
              },
              ...(this.isAdmin ? [{
                title: 'Manage Users',
                url: '/admin/users',
                icon: 'people'
              }] : []),
              ...(this.isEventManager ? [{
                title: 'Manage Events',
                url: '/profile/events',
                icon: 'build'
              }] : []),
              ...(this.isServiceProvider ? [{
                title: 'Manage Services',
                url: '/profile/services',
                icon: 'gift'
              }] : []),
            ];
        } else {
          this.loggedIn = false;
          this.navigate =
            [
              {
                title: 'Home',
                url: '/home',
                icon: 'home'
              },
              {
                title: 'Login',
                url: '/login',
                icon: 'log-in'
              },
              {
                title: 'Register',
                url: '/register',
                icon: 'person-add'
              },
              {
                title: 'About',
                url: '/about',
                icon: 'information-circle'
              },
              {
                title: 'Terms & Conditions',
                url: '/terms-conditions',
                icon: 'book'
              },
              {
                title: 'Privacy Policy',
                url: '/privacy-policy',
                icon: 'finger-print'
              },
            ];
        }
        // compare current url to menu urls and assign .active if they match
        this.navigate.map(p => {
          return p.active = (this.router.url === p.url);
        });
      });


  }


}

