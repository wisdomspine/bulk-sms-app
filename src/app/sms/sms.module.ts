import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsService, NEXMO_CONFIG } from './sms.service';
import { NexmoConfiguration } from '.';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SmsModule {
  static forRoot(config: NexmoConfiguration): ModuleWithProviders{
    return {
      ngModule: SmsModule,
      providers: [
        {
          provide: NEXMO_CONFIG,
          useValue: config
        }
      ]
    }
  }
 }
