import { Gender } from '../enum/gender.enum';
import { Model } from '../abstracts/model';

export class Message extends Model{
  from: string;
  receipients: MessageReceipient[] = [];
  body: string;
  status: MessageStatus = null;

  get sentStatus(): MessageStatus{
    const sent = this.receipients.filter(r => r.status === MessageReceipientStatus.SENT).length;

    if(this.receipients.length <= 0) return MessageStatus.NO_RECEIPIENT;

    else if(sent == 0 ) return MessageStatus.NOT_SENT;

    else return sent == this.receipients.length? MessageStatus.SENT : MessageStatus.PARTIAL;

  }
}

export declare interface FilterReceipients{
    gender?: Gender | string,
    search?: string,
    groupsId?: string[]
}
  
export const DefaultFilterReceipient: FilterReceipients = {
  gender: "any",
  search: "",
  groupsId: []
}

export interface MessageReceipient{
  id: string;
  status: MessageReceipientStatus
}

export enum MessageStatus{
  DRAFT = 'draft',
  SENT = 'sent',
  PARTIAL = "partial",
  NOT_SENT = "not sent",
  NO_RECEIPIENT = "no receipient"
}

export enum MessageReceipientStatus{
  SENT = 'delivered',
  NOT_SENT = 'not sent',
}

export const MESSAGE_STATA: MessageStatus[] = [
  MessageStatus.DRAFT,
  MessageStatus.SENT,
  MessageStatus.PARTIAL,
  MessageStatus.NOT_SENT,
  MessageStatus.NO_RECEIPIENT
]

export const messagePluralMapping = {
  '=0' : 'empty',
  '=1' : '1 message',
  'other' : '# messages'
}

