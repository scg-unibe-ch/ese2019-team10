
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import {LoginPage} from './pages/login/login.page';
// import {RegisterPage} from './pages/register/register.page';

const routes: Routes = [
  // {  path: 'register', component: RegisterPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  // { path: 'login', component: LoginPage },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
