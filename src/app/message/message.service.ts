import { Injectable } from '@angular/core';
import { DataServer, SelectableData } from '../abstracts/data-server';
import { Message } from './message.model';
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
}
