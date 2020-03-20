import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NbTabsetModule, NbSelectModule, NbButtonModule, NbIconModule, NbInputModule, NbCardModule, NbSpinnerModule, NbToastrModule, NbCheckboxModule, NbListModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { ngfModule } from "angular-file";
import { SettingModule } from '../setting/setting.module';
import { DirectivesModule } from '../directives/directives.module';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireModule } from '@angular/fire';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ContactService } from './contact.service';
import { EditContactService } from './edit-contact/edit-contact.service';

const DECLARATIONS =[
  ContactComponent,
  NewContactComponent,
  EditContactComponent
];

const NG_IMPORTS = [
  CommonModule,
  ContactRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  AngularFirestoreModule,
  AngularFireModule,
];

const NB_IMPORTS = [
  NbTabsetModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbCardModule,
  NbSpinnerModule,
  NbToastrModule,
  NbCheckboxModule,
  NbListModule,
  NbUserModule

];

const APP_IMPORTS =[
  UtilsModule,
  SettingModule,
  DirectivesModule
];

const OTHER_IMPORTS = [
  ngfModule
];

const PROVIDERS =[
  ContactService,
  EditContactService
];

const EXPORTS = [
  ContactRoutingModule
];

const ENTRY_COMPONENTS = [
  EditContactComponent
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
export class ContactModule { }
