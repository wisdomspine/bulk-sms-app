import { Injectable, InjectionToken, Inject } from '@angular/core';
import { NexmoConfiguration } from '.';
import { Nexmo } from './nexmo';
import { HttpClient } from '@angular/common/http';

export const NEXMO_CONFIG = new InjectionToken<NexmoConfiguration>("nexmo")

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private nexmo: Nexmo;

  constructor(
    @Inject(NEXMO_CONFIG) config: NexmoConfiguration,
    http: HttpClient
  ) {
    this.nexmo= new Nexmo(config, http);
   }

   sendSms(config:{
     from: string | number,
     to: string | number,
     body: string
   }): Promise<any>{
      return this.nexmo.sendSms(config);
   }
}
