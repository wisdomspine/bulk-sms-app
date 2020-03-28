import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_PATHS } from '../paths';
import { ContactComponent } from './contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';


const routes: Routes = [
  {
    path: APP_PATHS.contacts,
    component: ContactComponent
  },
  {
    path: APP_PATHS.newContact,
    component: NewContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
