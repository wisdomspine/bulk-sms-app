import { Gender } from '../enum/gender.enum';

export class Message {
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


