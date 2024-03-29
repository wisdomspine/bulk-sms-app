import { Injectable } from '@angular/core';
import { NbDialogService, NbDialogConfig } from '@nebular/theme';
import { ConfirmComponent, ConfirmContext, defaultConfirmContext } from './components/confirm/confirm.component';
import { PromptContext, defaultPromptContext, PromptComponent } from './components/prompt/prompt.component';
import { NotifyContext, defaultNotifyContext, NotifyComponent } from './components/notify/notify.component';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(
    public dialogService: NbDialogService
  ) { 

  }

  confirm(config:{
    autoFocus?: boolean,
    closeOnBackdropClick?:boolean,
    closeOnEsc?: boolean,
    hasBackdrop?: boolean,
    context?: ConfirmContext
  }={
    context:defaultConfirmContext
  }){
    return this.dialogService.open(ConfirmComponent, config);
  }

  prompt(config:{
    autoFocus?: boolean,
    closeOnBackdropClick?:boolean,
    closeOnEsc?: boolean,
    hasBackdrop?: boolean,
    context?: PromptContext
  }={
    context:defaultPromptContext
  }){
    return this.dialogService.open(PromptComponent, config);
  }

  notify(config:{
    autoFocus?: boolean,
    closeOnBackdropClick?:boolean,
    closeOnEsc?: boolean,
    hasBackdrop?: boolean,
    context?: NotifyContext
  }={
    context:defaultNotifyContext
  }){
    return this.dialogService.open(NotifyComponent, config);
  }  
}
