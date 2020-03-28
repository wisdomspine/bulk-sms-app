import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';
import { ContactService } from '../contact/contact.service';
import { GroupService } from '../group/group.service';
import { APP_PATHS } from '../paths';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  messageCount: number = 0;
  contactCount: number = 0;
  groupCount: number = 0;

  messagesLink = "/"+APP_PATHS.messages;
  contactsLink = "/"+APP_PATHS.contacts;
  groupsLink = "/"+APP_PATHS.groups;

  constructor(
    private messageService: MessageService,
    private contactService: ContactService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.messageService.get().subscribe(messages => {
      this.messageCount = messages.length;
    })

    this.contactService.get().subscribe(contacts => {
      this.contactCount = contacts.length;
    })   
    
    this.groupService.get().subscribe(groups => {
      this.groupCount = groups.length;
    })      
  }

}
