import { HttpClient } from "@angular/common/http";
/*  
    This is a wrapper class with type support for sending messages via nexmo api
*/
import { NexmoConfiguration } from '.';
import { MessageReceipientStatus } from '../message/message.model';

const URL = "/nexmo/sms/json";


export class Nexmo {
    constructor(private config: NexmoConfiguration, private http: HttpClient) {
        
    }

    sendSms(body: {
        from: string | number,
        to: string | number,
        body: string
    }){
        
        const data ={
            api_key: this.config.apiKey,
            api_secret: this.config.apiSecret,
            from: (body.from+"").substring(0, 12),
            to: body.to,
            text: body.body
        };

        const promise = new Promise((resolve, reject) => {
            this.http.post<any>(URL, data).subscribe(
                body => {
                    if(body.messages[0]['status'] == "0"){
                        resolve(MessageReceipientStatus.SENT)
                    }else{
                        reject(body.messages[0]['error-text'])
                    }
                },
                error => {
                    reject(error.message || error || "error");
                }
            )
        })

        return promise
    }
}