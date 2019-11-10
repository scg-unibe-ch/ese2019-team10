import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './services/auth-guard.service';
import {AdminGuardService} from './services/admin-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
  {path: 'registered', loadChildren: './pages/registered/registered.module#RegisteredPageModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule'},
  {
    path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/users', loadChildren: './admin/users/users.module#UsersPageModule',
    canActivate: [AuthGuardService, AdminGuardService]
  },
  {path: 'about', loadChildren: './pages/about/about.module#AboutPageModule'},
  {path: '**', loadChildren: './pages/page-not-found/page-not-found.module#PageNotFoundPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
