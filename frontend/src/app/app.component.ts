import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TodoList} from './todo-list';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
// import {LoginPage} from './login/login.page';
import {AuthService} from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {
  rootPage: any = 'HomePage';
  navigate: any;

  todoList: TodoList = new TodoList(null, '');
  todoLists: TodoList[] = [];

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
        if (state) {
          this.router.navigate(['dashboard']).then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err); // when there's an error
          });
        } else {
          console.log(state);
/*          this.router.navigate(['login']).then(nav => {
            console.log(nav); // true if navigation is successful
          }, err => {
            console.log(err); // when there's an error
          });*/
        }
      });
    });
  }

  ngOnInit() {
/*    this.httpClient.get('http://localhost:3000/todolist').subscribe((instances: any) => {
      this.todoLists = instances.map((instance) => new TodoList(instance.id, instance.name));
    });*/

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.navigate.map(p => {
          return p.active = (event.url === p.url);
        });
      }
    });

  }

  /*onTodoListCreate() {
    this.httpClient.post('http://localhost:3000/todolist', {
      name: this.todoList.name
    }).subscribe((instance: any) => {
      this.todoList.id = instance.id;
      this.todoLists.push(this.todoList);
      this.todoList = new TodoList(null, '');
    });
  }

  onTodoListDestroy(todoList: TodoList) {
    this.todoLists.splice(this.todoLists.indexOf(todoList), 1);
  }*/


  sideMenu() {
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
      ];
  }


}

