import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message/message.component';
import { NewMessageComponent } from './new-message/new-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbSelectModule, NbButtonModule, NbIconModule, NbInputModule, NbCardModule, NbSpinnerModule, NbToastrModule, NbCheckboxModule, NbListModule, NbUserModule, NbDialogModule } from '@nebular/theme';
import { UtilsModule } from '../utils/utils.module';
import { SettingModule } from '../setting/setting.module';
import { DirectivesModule } from '../directives/directives.module';
import { ngfModule } from 'angular-file';
import { FilterReceipientsComponent } from './filter-receipients/filter-receipients.component';
import { FilterReceipientsService } from './filter-receipients/filter-receipients.service';
import { MessageService } from './message.service';
import { ContactModule } from '../contact/contact.module';
import { GroupModule } from '../group/group.module';

const DECLARATIONS =[
  MessageComponent,
  NewMessageComponent,
  FilterReceipientsComponent
];

const NG_IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

const NB_IMPORTS = [    
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbCardModule,
  NbSpinnerModule,
  NbToastrModule,
  NbCheckboxModule,
  NbListModule,
  NbUserModule,
  NbDialogModule

];

const APP_IMPORTS =[
  UtilsModule,
  SettingModule,
  DirectivesModule,
  MessageRoutingModule,
  ContactModule,
  GroupModule
];

const OTHER_IMPORTS = [
  ngfModule
];

const PROVIDERS =[
  FilterReceipientsService,
  MessageService
];

const EXPORTS = [
  MessageRoutingModule
];

const ENTRY_COMPONENTS = [
  FilterReceipientsComponent
]

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...NG_IMPORTS, ...NB_IMPORTS, ...APP_IMPORTS, ...OTHER_IMPORTS],
  providers: [...PROVIDERS],
  exports: [...EXPORTS],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
})
export class MessageModule { }
