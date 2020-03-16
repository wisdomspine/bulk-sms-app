import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { NbTabsetModule, NbSelectModule, NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  NbInputModule
];

const APP_IMPORTS =[

];

const PROVIDERS =[

];

const EXPORTS = [
  ContactRoutingModule
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...NG_IMPORTS, ...NB_IMPORTS, ...APP_IMPORTS],
  providers: [...PROVIDERS],
  exports: [...EXPORTS]
})
export class ContactModule { }
