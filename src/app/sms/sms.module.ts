import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialsObject } from 'nexmo';
import { SmsService } from './sms.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SmsModule {
  forRoot(config: CredentialsObject): ModuleWithProviders{
    return {
      ngModule: SmsModule,
      providers: [
        {
          provide: SmsService,
          useValue: new SmsService(config)
        }
      ]
    }
  }
 }
