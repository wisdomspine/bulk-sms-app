import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MessageService } from '../message.service';
import { SelectableData } from 'src/app/abstracts/data-server';
import { Message, MESSAGE_STATA, MessageStatus, messagePluralMapping } from '../message.model';
import { FormControl } from '@angular/forms';
import { InteractionService } from 'src/app/utils/interaction/interaction.service';
import { NbToastrService } from '@nebular/theme';
import { ToastrTitle } from 'src/app/utils/interaction/toastr';
import { I18nPluralPipe } from "@angular/common";
import { APP_PATHS } from 'src/app/paths';
import { filter } from 'rxjs/operators';
import { MessagePreviewService } from '../message-preview/message-preview.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: SelectableData<Message>[] = [];
  filteredMessages: SelectableData<Message>[] =[]
  search: FormControl = new FormControl('');
  loading: boolean = false;
  stata: MessageStatus[] | string[] = ["Status", ...MESSAGE_STATA]
  status: FormControl = new FormControl();
  selectAll: FormControl = new FormControl(false);
  deleting: boolean = false;
  resultMapping: any = messagePluralMapping;
  link = APP_PATHS.newMessage;

  constructor(
    private server: MessageService,
    private interactionService: InteractionService,
    private ref: ChangeDetectorRef,
    private toastrService: NbToastrService,
    private messagePreviewService: MessagePreviewService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.server.get().subscribe(messages => {
      this.messages = messages.map(m => {
        const message = new Message();
        Object.assign(message, m.payload.doc.data());
        return {
          selected: new FormControl(false),
          id: m.payload.doc.id,
          data: message
        }
      })
      this.loading = false;
      this.filter();
    })
  }

  filter(){
    this.selectAll.setValue(false);
    this.filteredMessages = this.server.filter(
      this.messages,
      this.search.value,
      <MessageStatus> this.status.value || undefined
    ).map(m => ({
      id: m.id,
      data: m.data,
      selected: new FormControl(false)
    }))
  }

  selectAllMessages(e){
    this.selectAll.setValue(e);
    this.filteredMessages.forEach(m => m.selected.setValue(e));
  }

  selectOne(e, control: SelectableData<Message>){
    if(!e){
      this.selectAll.setValue(false)
    }
    control.selected.setValue(e);
  }

  deleteOne(message: SelectableData<Message>){
    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete message?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      if(r){
        this.server.delete(message.id).then(() => {
          this.toastrService.success("Message deleted", ToastrTitle.SUCCESS);
          this.ref.detectChanges()
        }).catch(e => this.toastrService.success("Message not deleted", ToastrTitle.DANGER) && this.ref.detectChanges())

      }
    })
  }

  deleteSelected(){
    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete messages?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      if(r){
        this.deleting = true;
        const toBeDeleted = this.filteredMessages.filter(m => m.selected.value)
        let count = 0;
        Promise.all(
          toBeDeleted.map(m => {
            const promise = this.server.delete(m.id)
            promise.then(() => ++count && this.ref.detectChanges())
            
            return promise;
          })
        ).then(() => {
          this.deleting = false;
          this.interactionService.notify({
            context: {
              body: `Delete ${count} message`,
              status: "primary"
            }
          })
          this.ref.detectChanges()
        }).catch(() => {
          this.deleting = false;
          this.interactionService.notify({
            context: {
              body: `Delete ${count} message`,
              status: "warning"
            }
          }) 
          this.ref.detectChanges()         
        })
      }
    })    
  }

  private getStatus(message: SelectableData<Message>){
    const m = message.data;
    return this.server.getStatus(m);
  }

  private isPreviewable(message: SelectableData<Message>){
    const m = message.data;
    return this.server.isPreviewable(m);    
  }

  preview(message: SelectableData<Message>){
    this.messagePreviewService.preview({
      id: message.id,
      status: this.getStatus(message)
    })
  }
}
