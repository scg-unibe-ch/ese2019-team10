import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ServicePage} from './service.page';
import {SharedComponentsModule} from '../../../components/shared-components.module';


const routes: Routes = [
  {
    path: '',
    component: ServicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ServicePage]
})
export class ServicePageModule {
}
