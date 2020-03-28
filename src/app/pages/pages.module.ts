import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModule } from '../contact/contact.module';
import { GroupModule } from '../group/group.module';
import { MessageModule } from '../message/message.module';
import { NbDialogModule } from '@nebular/theme';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';


const NB_IMPORTS = [
  NbDialogModule.forChild()
]

const NG_IMPORTS = [
  CommonModule,
]

const APP_IMPORTS = [
  ContactModule,
  GroupModule,
  MessageModule,
  DashboardModule,
  PagesRoutingModule
]

const DECLARATIONS = [

];

const PROVIDERS = [
];

const EXPORTS = [
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    ...NG_IMPORTS,
    ...NB_IMPORTS,
    ...APP_IMPORTS,
  ],
  providers: [...PROVIDERS],
  exports: [...EXPORTS]
})
export class PagesModule { }
