import { Injectable } from '@angular/core';
import Nexmo, { CredentialsObject } from "nexmo";

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private nexmo: Nexmo;

  constructor(
    config: CredentialsObject
  ) {
    this.nexmo= new Nexmo(config);
   }

   sendSms(config:{
     from: string | number,
     to: string | number,
     body: string
   }): Promise<any>{
      return new Promise<any>((resolve, reject)=> {
        this.nexmo.message.sendSms(
          config.from,
          config.to,
          config.body,
          (err, responseData)=>{
            if(responseData.messages[0]['status'] == "0"){
              resolve("success");
            }else{
              reject(`Error: ${responseData.messages[0]['error-text']}`)
            }
          }
        )
      })
   }
}
