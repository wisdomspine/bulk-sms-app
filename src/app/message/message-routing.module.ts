import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_PATHS } from '../paths';
import { NewMessageComponent } from './new-message/new-message.component';
import { MessageComponent } from './message/message.component';


const routes: Routes = [
  {
    path: APP_PATHS.newMessage,
    component: NewMessageComponent
  },

  {
    path: APP_PATHS.messages,
    component: MessageComponent
  },

  {
    path: APP_PATHS.newMessage+"/:id",
    component: NewMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
