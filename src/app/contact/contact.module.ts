import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NbTabsetModule, NbSelectModule, NbButtonModule, NbIconModule, NbInputModule, NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { ngfModule } from "angular-file";
import { SettingModule } from '../setting/setting.module';
import { DirectivesModule } from '../directives/directives.module';

const DECLARATIONS =[
  ContactComponent,
  NewContactComponent
];

const NG_IMPORTS = [
  CommonModule,
  ContactRoutingModule,
  FormsModule,
  ReactiveFormsModule
];

const NB_IMPORTS = [
  NbTabsetModule,
  NbSelectModule,
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbCardModule

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

];

const EXPORTS = [
  ContactRoutingModule
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...NG_IMPORTS, ...NB_IMPORTS, ...APP_IMPORTS, ...OTHER_IMPORTS],
  providers: [...PROVIDERS],
  exports: [...EXPORTS]
})
export class ContactModule { }
