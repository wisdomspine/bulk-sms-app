import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { ContactModule } from '../contact/contact.module';
import { GroupModule } from '../group/group.module';
import { MessageModule } from '../message/message.module';
import { NbButtonModule, NbIconModule, NbCardModule, NbBadgeModule } from '@nebular/theme';
import { UtilsModule } from '../utils/utils.module';
import { SettingModule } from '../setting/setting.module';
import { DirectivesModule } from '../directives/directives.module';
import { ngfModule } from 'angular-file';
import { RouterModule } from '@angular/router';

const DECLARATIONS =[
  DashboardComponent
];

const NG_IMPORTS = [
  CommonModule,
  RouterModule
];

const NB_IMPORTS = [
  NbButtonModule,
  NbIconModule,
  NbCardModule,
  NbBadgeModule
];

const APP_IMPORTS =[
  UtilsModule,
  SettingModule,
  DirectivesModule,
  ContactModule,
  GroupModule,
  MessageModule
];

const OTHER_IMPORTS = [
  ngfModule
];

const PROVIDERS =[
];

const EXPORTS = [
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
export class DashboardModule { }
