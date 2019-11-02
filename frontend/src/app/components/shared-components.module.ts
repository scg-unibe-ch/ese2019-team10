import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from './header/header.component';
import {ServiceComponent} from './service/service.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ServiceComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    ServiceComponent,
  ],
})

export class SharedComponentsModule {
}
