import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './services/auth-guard.service';
import {AdminGuardService} from './services/admin-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'about', loadChildren: './pages/about/about.module#AboutPageModule'},
  {path: 'faq', loadChildren: './pages/faq/faq.module#FaqPageModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule'},
  {path: 'registered', loadChildren: './pages/registered/registered.module#RegisteredPageModule'},
  {path: 'privacy-policy', loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule'},
  {path: 'terms-conditions', loadChildren: './pages/terms/terms.module#TermsPageModule'},
  {
    path: 'search', loadChildren: './pages/search/search.module#SearchPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/services', loadChildren: './pages/profile/services/services.module#ServicesPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/events', loadChildren: './pages/profile/events/events.module#EventsPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'user/profile/:userId', loadChildren: './pages/user/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'user/service/:serviceId', loadChildren: './pages/user/service/service.module#ServicePageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'user/event/:eventId', loadChildren: './pages/user/event/event.module#EventPageModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/users', loadChildren: './pages/admin/users/users.module#UsersPageModule',
    canActivate: [AuthGuardService, AdminGuardService]
  },
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
