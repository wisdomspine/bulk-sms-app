import { Injectable } from '@angular/core';
import { NbDialogService, NbDialogConfig } from '@nebular/theme';
import { MessagePreviewComponent } from './message-preview.component';

@Injectable({
  providedIn: 'root'
})
export class MessagePreviewService {

  constructor(
    private dialogService: NbDialogService
  ) { }

  preview(param: {
    id: string,
    status?: string
  }){
    this.dialogService.open(MessagePreviewComponent, {
      context: {
        id: param.id,
        status: param.status
      },
      autoFocus: false,
      closeOnBackdropClick: false
    })
  }
}
