import { Component, OnInit, Input } from '@angular/core';
import { FilterReceipients, DefaultFilterReceipient } from './filter-receipients.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupService } from 'src/app/group/group.service';
import { NbDialogRef } from '@nebular/theme';
import { Gender, GENDERS } from 'src/app/enum/gender.enum';
import { constructor } from 'bytes';

@Component({
  selector: 'app-filter-receipients',
  templateUrl: './filter-receipients.component.html',
  styleUrls: ['./filter-receipients.component.scss']
})
export class FilterReceipientsComponent implements OnInit {

  @Input() filter: FilterReceipients = DefaultFilterReceipient

  form: FormGroup;

  loaded = false;

  groups: {id:string, name: string}[];
  genders: Gender[] | string[] = ["Any", ...GENDERS];

  constructor(
    private groupService: GroupService,
    private ref: NbDialogRef<FilterReceipientsComponent>
  ) { }

  ngOnInit() {
    const search = new FormControl(this.filter.search || "");
    const gender = new FormControl(this.filter.gender || undefined) ;
    const groupsId = new FormControl(this.filter.groupsId || []) ;
    this.form = new FormGroup({
      search,
      gender,
      groupsId
    })
    this.groupService.get().subscribe(results => {
      this.groups = results.map( result => {
        return {
          id: result.payload.doc.id,
          name: result.payload.doc.data().name
        }
      })
      this.loaded = true;
    })    
  }

  submit(){
    this.ref.close({
      search: this.form.controls.search.value,
      gender: this.form.controls.gender.value,
      groupsId: this.form.controls.groupsId.value
    })
  }

  close(){
    this.ref.close(undefined);
  }
}
