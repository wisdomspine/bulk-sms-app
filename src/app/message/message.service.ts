import { Injectable } from '@angular/core';
import { DataServer, SelectableData } from '../abstracts/data-server';
import { Message, MessageStatus } from './message.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { SmsService } from '../sms/sms.service';
import { Contact } from '../contact/contact.model';

const collectionName = "message";

@Injectable({
  providedIn: 'root'
})
export class MessageService extends DataServer<Message>{

  constructor(
    store: AngularFirestore,
    private smsServer: SmsService
  ) {
    super(store, collectionName);
  }

  filter(data: SelectableData<Message>[], search: string, status?: MessageStatus){
    const regExp = new RegExp(search || '', "gi");
    return data.filter(d => {
      let matched: boolean = regExp.test(d.data.from) || regExp.test(d.data.body);
      if(status) matched = matched && status == d.data.status;

      return matched
    })
  }
}
