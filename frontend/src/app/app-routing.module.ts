
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import {LoginPage} from './pages/login/login.page';
// import {RegisterPage} from './pages/register/register.page';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  // {  path: 'register', component: RegisterPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'registered', loadChildren: './pages/registered/registered.module#RegisteredPageModule' },
  // { path: 'login', component: LoginPage },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuardService]
  },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
