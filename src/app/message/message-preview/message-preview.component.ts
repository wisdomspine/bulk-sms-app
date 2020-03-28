import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { SelectableData } from 'src/app/abstracts/data-server';
import { Contact } from 'src/app/contact/contact.model';
import { MessageService } from '../message.service';
import { ContactService } from 'src/app/contact/contact.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Message, MessageReceipientStatus, MessageStatus } from '../message.model';
import { InteractionService } from 'src/app/utils/interaction/interaction.service';
import { ToastrTitle } from 'src/app/utils/interaction/toastr';
import { SmsService } from 'src/app/sms/sms.service';

@Component({
  selector: 'app-message-preview',
  templateUrl: './message-preview.component.html',
  styleUrls: ['./message-preview.component.scss']
})
export class MessagePreviewComponent implements OnInit {

  @Input() id: string;
  @Input() status: string;

  contacts: SelectableData<Contact>[] = [];
  message: SelectableData<Message>;
  messageContacts: SelectableData<Contact>[] = [];
  messages: SelectableData<Message>[] = [];
  loading: boolean = false;
  loadingContacts: boolean = false;
  messagesLoaded: boolean = false;
  contactsLoaded: boolean = false; //when true, implies contacts have be loaded for at least once
  deleting: boolean = false;
  sending: boolean = false;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService,
    private ref: NbDialogRef<MessagePreviewComponent>,
    private templateRef: ChangeDetectorRef,
    private interactionService: InteractionService,
    private toastrService: NbToastrService,
    private smsService: SmsService
  ) { }

  ngOnInit() {
    //map all contacts
    if(!this.id) this.close()
    this.loadMessages();

  }

  close(){
    this.ref.close();
  }

  private loadMessages(){
    this.loading = true;
    this.messageService.get().subscribe(
      next => {
        if(next.length <= 0)this.close(); //no message to preview
        this.messages = next.map(data => {
          const message = new Message();
          Object.assign(message, data.payload.doc.data());

          return {
            id: data.payload.doc.id,
            data: message
          }
        }).filter(m => this.messageService.isPreviewable(m.data));
        this.loadContacts();
        this.loading = false;
        this.messagesLoaded = true;
      },
      error => this.loading = false && this.close()
    )
  }

  private loadContacts(){
    if(this.contactsLoaded) return;// no need since we have a subscriber already created on the first load
    this.loadingContacts = true;
    this.contactService.get().subscribe(
      next => {
        if(next.length <= 0)this.close(); //no message to preview
        this.contacts = next.map(data => {
          const contact = new Contact();
          Object.assign(contact, data.payload.doc.data());

          return {
            id: data.payload.doc.id,
            data: contact
          }
        })
        this.loadingContacts = false;
        this.contactsLoaded = true;
        this.loadCurrent();
      },
      error => this.loadingContacts = false && this.close()
    )
  }

  loadMessageContacts(){
    //get the contacts of the current selected message
    //get all receipients of the current message
    if(!this.contacts || this.contacts.length <= 0) return this.messageContacts = [] ;
    //get all contacts of the current message 
    this.messageContacts = this.contactService.isIn(
      this.contacts,
      this.message.data.receipients
    )

  }

  private next(){
    let index = this.getIndex(); 
    if(index == -1) return this.close();
    this.id = this.messages[++index % this.messages.length].id
    this.loadCurrent()
  }

  private prev(){
    let index = this.getIndex(); 
    if(index == -1) return this.close();
    if(index == 0) index = this.messages.length;
    this.id = this.messages[--index].id
    this.loadCurrent()
  }

  private getIndex(){
    //get index of current message
    const index = this.messages.findIndex(m => m.id == this.id);
    return index >= 0? index : (this.messages.length >0 ? 0 : -1);
  }

  private loadCurrent(){
    this.message = this.messages[this.getIndex()];
    this.loadMessageContacts();
    this.templateRef.markForCheck();
    this.templateRef.detectChanges();
  }

  delete(){
    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete message?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      if(r){
        this.deleting = true;
        this.messageService.delete(this.id).then(() => {
          this.toastrService.success("Message deleted", ToastrTitle.SUCCESS);
          this.deleting = false;
          this.templateRef.detectChanges();
          this.next();
        }).catch(e => {
          this.toastrService.success("Message not deleted", ToastrTitle.DANGER) && this.templateRef.detectChanges();
          this.deleting = false;
        })

      }
    })
  }

  retry(){
    //resend a message that was not or partially sent
    //get receipients to be send to
    const receipientToSend = this.message.data.receipients.filter(r => r.status == MessageReceipientStatus.NOT_SENT);
    const receipientContacts = this.contactService.isIn(
      this.contacts,
      receipientToSend
    );
    let count = 0;
    this.sending = true;
    Promise.all(
      receipientContacts.map(receipient => {
        const promise = this.smsService.sendSms({
          from: this.message.data.from,
          to: receipient.data.phoneDigits,
          body: this.message.data.body
        })

        promise.then(s => {
          this.toastrService.success(
            `Message sent to ${receipient.data.contact}`,
            ToastrTitle.SUCCESS
          )
          ++count;
          const r = this.message.data.receipients.find(r => r.id == receipient.id);
          if(r) r.status = MessageReceipientStatus.SENT; //mark as sent
        }).catch(e => {
          this.toastrService.danger(e, ToastrTitle.DANGER)
        })
        return promise;
      })      
    ).then(async success => {
      //message finally sent
      this.sending = false;
      if(count == 0) return; //don't waste bandwidth
      const all: boolean = receipientContacts.length == count;
      this.message.data.status = all? MessageStatus.SENT : MessageStatus.PARTIAL;
      await this.messageService.update(this.message.data, this.id)
      this.interactionService.notify({
        context: {
          body: !all? "Not all messages sent" : "Messages sent",
          status: !all? "warning" : "success",
        }
      })     
    }).catch(async e => {
      this.sending = false;
      let message;
      let status;
      if(count == 0){
        message = "message not delivered"
        status = "warning";
      }else if(count != receipientContacts.length){
        this.message.data.status = MessageStatus.PARTIAL;
        message = "message not delivered to all"
        status = "warning";
        //save and navigate
        await this.messageService.update(this.message.data, this.id)
      }else{
        message = e.message || e || "Error sending sms"
        status = "danger"; 
      }
      this.interactionService.notify({
        context: {
          status,
          body: message
        }
      });
    })
  }

  canRetry(){
      //check if a message can be retried
      switch(this.message.data.status){
        case MessageStatus.NOT_SENT:
        case MessageStatus.PARTIAL:
          return true;
        default:
          return false;
      }
  }
  
  sent(contact: SelectableData<Contact>){
    const receipient = this.message.data.receipients.find( r => r.id == contact.id);
    if(!receipient) return true;
    return receipient.status === MessageReceipientStatus.SENT ? true : false;
  }
}
