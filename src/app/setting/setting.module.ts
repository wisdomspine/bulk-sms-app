import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingService } from './setting.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SettingRoutingModule
  ],
  providers: [
    SettingService
  ],

  exports: [
    SettingService,
    SettingRoutingModule
  ]
})
export class SettingModule { }
