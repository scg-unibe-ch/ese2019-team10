import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';

import {ServicesPage} from './services.page';
import {SharedComponentsModule} from '../../../components/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage
  }
];

@NgModule({
  declarations: [ServicesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedComponentsModule,
  ],
  exports: [
    ServicesPage
  ]
})
export class ServicesPageModule {
}
