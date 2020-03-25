import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, MessageStatus, FilterReceipients, MessageReceipientStatus } from '../message.model';
import { ContactService } from 'src/app/contact/contact.service';
import { GroupService } from 'src/app/group/group.service';
import { MessageService } from '../message.service';
import { SettingService } from 'src/app/setting/setting.service';
import { MessageFormModel } from '../message-form.model';
import { APP_PATHS } from 'src/app/paths';
import { SelectableData } from 'src/app/abstracts/data-server';
import { Contact } from 'src/app/contact/contact.model';
import { Group } from 'src/app/group/group.model';
import { FormControl } from '@angular/forms';
import { Gender } from 'src/app/enum/gender.enum';
import { FilterReceipientsService } from '../filter-receipients/filter-receipients.service';
import { NbToastrService } from '@nebular/theme';
import { ToastrTitle } from 'src/app/utils/interaction/toastr';
import { InteractionService } from 'src/app/utils/interaction/interaction.service';
import { SmsService } from 'src/app/sms/sms.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  private id: string;
  private message: Message;
  private form: MessageFormModel;
  private editing: boolean = false; //when set to true, a draft is being edited
  private sending: boolean = false;
  private saving: boolean = false;
  spinnerMessage = "Sending message";
  loading: boolean = false; //when set to true, implies getting contacts
  draft: MessageStatus = MessageStatus.DRAFT;
  discarding: boolean = false;

  selectAllAvailable: FormControl = new FormControl(false);
  selectAllReceipients: FormControl = new FormControl(false);

  availableSearch: FormControl = new FormControl('');
  receipientSearch: FormControl = new FormControl('');

  availableGroupsId: string[] = [];
  receipientGroupsId: string[] = [];

  availableGender: Gender  = null;
  receipientGender: Gender = null;

  contacts: SelectableData<Contact>[];

  availableContacts: SelectableData<Contact>[];
  receipients: SelectableData<Contact>[];
  
  matchedContacts: SelectableData<Contact>[];
  matchedReceipients: SelectableData<Contact>[];

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private groupService: GroupService,
    private server: MessageService,
    private settingService: SettingService,
    private router: Router,
    private advancedFilterService: FilterReceipientsService,
    private toastrService: NbToastrService,
    private interactionService: InteractionService,
    private smsService: SmsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if(!id){
      //creating a new message
      this.message = new Message();
      this.message.from = this.settingService.from
      this.form = new MessageFormModel(this.message);
      this.loadContacts()
    }else{
      this.id = id;
      this.server.getOne(id).subscribe(one => {
        const data = one.payload.data();
        const message = new Message();
        Object.assign(message, data);
        if(message.status != MessageStatus.NO_RECEIPIENT && message.status != MessageStatus.DRAFT){
          this.router.navigateByUrl(APP_PATHS.messages);
        }
        this.message = message;
        this.form = new MessageFormModel(message); //navigating from send message
        this.editing = true;
        this.loadContacts();
      })
    }
  }

  private loadContacts(message: Message = this.message){
    //load all contacts and groups ass 
    this.loading = true;
    this.contactService.get().subscribe( cons => {
      this.contacts = cons.map((c) => {
        const data = new Contact();
        Object.assign(data, c.payload.doc.data());
        return {
          selected: new FormControl(false),
          data: data,
          id: c.payload.doc.id
        }
      })
      this.loading = false;
      this.filter();
    })     
  }

  filter(){
    if(!this.contacts) {
      this.contacts = [];
      this.availableContacts = [];
      this.receipients = [];
      return;
    }
    const receipientsId = this.message && this.message.receipients || [];
    this.availableContacts = this.contactService.notIn(
      this.contacts,
      receipientsId.map(r => ({
        id: r.id
      }))
    )

    this.receipients = this.contactService.isIn(
      this.contacts,
      receipientsId.map(r => ({
        id: r.id
      }))
    )

    this.filterAvailable();
    this.filterReceipients();    
  }

  filterAvailable(){
    this.matchedContacts = this._filter({
      search: this.availableSearch.value,
      gender: this.availableGender || null,
      groups: this.availableGroupsId || [],
      data: this.availableContacts || [],
    }).map(c => ({
      id: c.id,
      selected: new FormControl(false),
      data: c.data
    }))

    this.selectAllAvailable.setValue(false);
  }

  filterReceipients(){
    this.matchedReceipients = this._filter({
      search: this.receipientSearch.value,
      gender: this.receipientGender || null,
      groups: this.receipientGroupsId || [],
      data: this.receipients || [],
    }).map(c => ({
      id: c.id,
      selected: new FormControl(false),
      data: c.data
    }))

    this.selectAllReceipients.setValue(false);
  }

  advanceFilter(receipient: boolean = false){
    if(receipient){
      this.advancedFilterService.filter({
        gender: this.receipientGender,
        search: this.receipientSearch.value,
        groupsId: this.receipientGroupsId
      }).onClose.subscribe((res:FilterReceipients) => {
          if(res){
            //the user actually submitted a search filter
            this.receipientGroupsId = res.groupsId;
            this.receipientSearch.setValue(res.search || "");
            this.receipientGender = <Gender> res.gender;
            this.filterReceipients();
          }
      })
    }else{
      //available

      this.advancedFilterService.filter({
        gender: this.availableGender,
        search: this.availableSearch.value,
        groupsId: this.availableGroupsId
      }).onClose.subscribe((res:FilterReceipients) => {
          if(res){
            //the user actually submitted a search filter
            this.availableGroupsId = res.groupsId;
            this.availableSearch.setValue(res.search || "");
            this.availableGender = <Gender> res.gender;
            this.filterAvailable();
          }
      })      
    }
  }

  selectOne(e, control: SelectableData<Contact>, receipient: boolean = false){
    if(receipient){
      if(this.selectAllReceipients.value) {
        this.selectAllReceipients.setValue(false);
      }
      control.selected.setValue(e)
    }else{
      if(this.selectAllAvailable.value) {
        this.selectAllAvailable.setValue(false);
      }
      control.selected.setValue(e)     
    }
  }

  selectAll(e, receipient: boolean = false){
    if(receipient){
      this.selectAllReceipients.setValue(e);
      if(this.matchedReceipients){
        this.matchedReceipients.forEach(m => m.selected.setValue(e))
      }
    }else{
      this.selectAllAvailable.setValue(e);
      if(this.matchedContacts){
        this.matchedContacts.forEach(m => m.selected.setValue(e))
      }      
    }
  }

  async submit(){
    //send message to all contacts on the list
    this.sending = true;
    const receipients = this.message.receipients.filter(r => r.status !== MessageReceipientStatus.SENT);
    const toSend = this.contactService.isIn(
      this.receipients,
      receipients
    )
    let count = 0;

    Promise.all(
      toSend.map(receipient => {
        const promise = this.smsService.sendSms({
          from: this.form.controls.from.value,
          to: receipient.data.phoneDigits,
          body: this.form.controls.body.value
        })

        promise.then(s => {
          this.toastrService.success(
            `Message sent to ${receipient.data.contact}`,
            ToastrTitle.SUCCESS
          )
          ++count;
          const r = this.message.receipients.find(r => r.id == receipient.id);
          if(r) r.status = MessageReceipientStatus.SENT; //mark as sent
        }).catch(e => {
          this.toastrService.danger(e, ToastrTitle.DANGER)
        })
        return promise;
      })      
    ).then(async success => {
      this.sending = false;
      //message finally sent
      if(toSend.length == 0){
        this.interactionService.confirm({
          context: {
            message: "No contacts selected, save message as draft?",
            status: "warning",
          }
        }).onClose.subscribe(s => s? this.markAsDraft(): null)
      }else{
        //not all message was sent
        const all: boolean = toSend.length == count;
        this.message.status = all? MessageStatus.SENT : MessageStatus.PARTIAL;
        await this.save();
        this.interactionService.notify({
          context: {
            body: !all? "Not all messages sent" : "Messages sent",
            status: !all? "warning" : "success",
          }
        }).onClose.subscribe(async s => {
          this.router.navigateByUrl(APP_PATHS.messages);
        })        
      }
    }).catch(async e => {
      let message;
      let status;
      if(count == 0){
        message = "message not delivered"
        status = "warning";
        this.message.status = MessageStatus.NOT_SENT;
        await this.save(this.message.status);
      }else if(count != toSend.length){
        this.message.status = MessageStatus.PARTIAL;
        message = "message not delivered to all"
        status = "warning";
        //save and navigate
        await this.save(this.message.status)
      }else{
        message = e.message || e || "Error sending sms"
        status = "danger"; 
      }
      this.interactionService.notify({
        context: {
          status,
          body: message
        }
      }).onClose.subscribe(()=> {
        if((this.message.status == MessageStatus.PARTIAL || this.message.status == MessageStatus.NOT_SENT) && this.id){
          this.router.navigateByUrl(APP_PATHS.messages);
        }
      });
      this.sending = false
    })
  }

  private _filter(param:{
    search: string, 
    gender: Gender, 
    groups: string[], 
    data: SelectableData<Contact>[],
    isIn?: SelectableData<Contact>[],
    notIn?: SelectableData<Contact>[]
  }): SelectableData<Contact>[]{
    const contact = new Contact();
    contact.name = param.search;
    contact.phone = param.search;
    contact.gender = param.gender;

    if(param.isIn) param.data = this.contactService.isIn(param.data, param.isIn);
    if(param.notIn) param.data = this.contactService.notIn(param.data, param.notIn);

    param.data = this.contactService.filterContact(param.data, contact)
    if(param.groups.length >0){
        param.data = param.data.filter(p => {
        return param.groups.find(s => s == p.id);
      })
    }
    return param.data;
  }

  addContacts(){
    const toBeAdded = this.contactService.notIn(
      this.matchedContacts.filter(m => m.selected.value),
      this.receipients
    )
    this.message.receipients.push(...toBeAdded.map(c => ({
      id: c.id,
      status: MessageReceipientStatus.NOT_SENT
    })));
    this.filter();

  }

  removeContacts(){
    const toRemain= this.contactService.notIn(
      this.receipients,
      this.matchedReceipients.filter(c => c.selected.value)
    ) 
    
    this.message.receipients = toRemain.map(r => ({
      id: r.id,
      status: MessageReceipientStatus.NOT_SENT
    }))

    this.filter()
  }

  markAsDraft(){
    //mark a message as draft
    // const message = new Message();
    // message.body = this.form.controls.body.value;
    // message.from = this.form.controls.from.value;
    // message.status = MessageStatus.DRAFT;

    // // message.receipients = this.receipients.map(r => ({
    // //   id: r.id,
    // //   status: MessageReceipientStatus.NOT_SENT
    // // }))

    // this.saving = true;
    // this.server.create(message).then(e => {
    //     this.id = e.id;
    //     this.message.status = message.status
    //     this.toastrService.success("Message saved as draft", ToastrTitle.SUCCESS)
    //     this.saving = false;
    // }).catch(f => {
    //   this.toastrService.danger("Message not saved", ToastrTitle.DANGER);
    //   this.saving = false;
    // })

    this.save(MessageStatus.DRAFT, "Message saved as draft", "Message not saved",);
  }

  async save(status: MessageStatus = MessageStatus.SENT, success?: string, error?: string){
    //mark a message as draft
    const message = new Message();
    message.body = this.form.controls.body.value;
    message.from = this.form.controls.from.value;
    message.receipients = this.message.receipients;
    message.status = status;

    // message.receipients = this.receipients.map(r => ({
    //   id: r.id,
    //   status: MessageReceipientStatus.NOT_SENT
    // }))

    this.saving = true;

    if(this.id){
      await this.server.update(message, this.id).then(e => {
        this.toastrService.success("Saved", ToastrTitle.SUCCESS)
        this.saving = false;
    }).catch(f => {
      this.toastrService.danger("Not saved", ToastrTitle.DANGER);
      this.saving = false;
    }) 
    }else{
      //total new Message
      this.server.create(message).then(e => {
          this.id = e.id;
          this.message.status = message.status
          this.toastrService.success(success? success: "Message saved", ToastrTitle.SUCCESS)
          this.saving = false;
      }).catch(f => {
        this.toastrService.danger(error? error: "Message not saved", ToastrTitle.DANGER);
        this.saving = false;
      })      
    }   
  }

  discard(){
    if(this.id){
      this.interactionService.confirm({
        context: {
          message: "Discard message? this can't be undone",
          status: "danger"
        }
      }).onClose.subscribe(ans => {
        if(ans){
          this.server.delete(this.id).then(e => {
            this.interactionService.notify({
              context: {
                body: "Message discarded"
              }
            })
            this.router.navigateByUrl(APP_PATHS.messages);
          }).catch(e => {
            this.interactionService.notify({
              context: {
                body: "Message not discarded",
                status: "warning"
              }
            })
          })
        }
      })
    }
  }
}
