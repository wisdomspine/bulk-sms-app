import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { EditContactComponent } from './edit-contact.component';

@Injectable({
  providedIn: 'root'
})
export class EditContactService {

  constructor(
    private dialogService: NbDialogService
  ) { 

  }

  edit(id: string | number){
    return this.dialogService.open(EditContactComponent, {context: {id: id}});
  } 
}
