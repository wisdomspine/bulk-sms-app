import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { FilterReceipientsComponent } from './filter-receipients.component';
import { FilterReceipients, DefaultFilterReceipient } from '../message.model';

@Injectable({
  providedIn: 'root'
})
export class FilterReceipientsService {

  constructor(
    private dialogService: NbDialogService
  ) { }

  filter(filter: FilterReceipients = DefaultFilterReceipient){
    return this.dialogService.open(FilterReceipientsComponent, {
      context: {
        filter
      }
    })
  }
} 

