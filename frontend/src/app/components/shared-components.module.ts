import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

import {HeaderComponent} from './header/header.component';
import {ServiceComponent} from './service/service.component';
import {EventComponent} from './event/event.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ServiceComponent,
    EventComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    ServiceComponent,
    EventComponent,
  ],
})

export class SharedComponentsModule {
}
