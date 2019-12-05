import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

import {AuthService} from './services/auth.service';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {AdminService} from './services/admin.service';


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
    prefersDark: any;


    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private httpClient: HttpClient,
        private router: Router,
        private authService: AuthService,
        private authInterceptorService: AuthInterceptorService,
        private adminService: AdminService,
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
                /*if (state) {
                  this.router.navigateByUrl(this.routingState.getPreviousUrl()).then(nav => {
                    console.log(nav); // true if navigation is successful
                  }, err => {
                    console.log(this.routingState.getPreviousUrl()); // when there's an error
                  });
                } else {
                  console.log(state);
        /!*          /!*          this.router.navigate(['login']).then(nav => {
                              console.log(nav); // true if navigation is successful
                            }, err => {
                              console.log(err); // when there's an error
                            });*!/!*!/
                }*/
            });
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

        this.prefersDark.addEventListener('change', (e) => {
            this.checkToggle(e.matches);
        });

    }

    loadApp() {
        this.checkToggle(this.prefersDark.matches);
    }

    checkToggle(shouldCheck) {
        this.toggle.checked = shouldCheck;
    }


    logout() {
        this.authService.logout();
    }


    sideMenu() {
        this.authService.authenticationState.subscribe(() => {

            if (this.authService.isAuthenticated()) {
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
                            title: 'About',
                            url: '/about',
                            icon: 'information-circle'
                        },
                        {
                            title: 'FAQ',
                            url: '/faq',
                            icon: 'help'
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
                    ];
            }

        });


    }


}

