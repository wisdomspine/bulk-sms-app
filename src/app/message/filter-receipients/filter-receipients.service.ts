import { Injectable } from '@angular/core';
import { Gender } from 'src/app/enum/gender.enum';
import { NbDialogService } from '@nebular/theme';
import { FilterReceipientsComponent } from './filter-receipients.component';

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

export interface FilterReceipients{
  gender?: Gender | string,
  search?: string,
  groupsId?: string[]
}

export const DefaultFilterReceipient: FilterReceipients = {
  gender: "any",
  search: "",
  groupsId: []
}
