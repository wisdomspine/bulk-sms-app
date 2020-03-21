import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group/group.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { ContactRoutingModule } from '../contact/contact-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbSelectModule, NbButtonModule, NbIconModule, NbInputModule, NbCardModule, NbSpinnerModule, NbToastrModule, NbCheckboxModule, NbListModule, NbUserModule } from '@nebular/theme';
import { UtilsModule } from '../utils/utils.module';
import { SettingModule } from '../setting/setting.module';
import { DirectivesModule } from '../directives/directives.module';
import { ngfModule } from 'angular-file';
import { GroupService } from './group.service';

const DECLARATIONS =[
  GroupComponent,
  NewGroupComponent,
];

const NG_IMPORTS = [
  CommonModule,
  ContactRoutingModule,
  FormsModule,
  ReactiveFormsModule,
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
  GroupService
];

const EXPORTS = [
  GroupRoutingModule
];

const ENTRY_COMPONENTS = [
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
export class GroupModule { }
