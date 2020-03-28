import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../group.service';
import { GroupFormModel } from '../group-form.model';
import { Group } from '../group.model';
import { ContactService } from 'src/app/contact/contact.service';
import { group } from '@angular/animations';
import { InteractionService } from 'src/app/utils/interaction/interaction.service';
import { Gender, GENDERS } from 'src/app/enum/gender.enum';
import { FormControl } from '@angular/forms';
import { SelectableData, resultPluralMapping } from 'src/app/abstracts/data-server';
import { Contact } from 'src/app/contact/contact.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  editing: boolean = false;
  saving: boolean = false;
  form: GroupFormModel;
  id: string;
  genders: Gender[] | string[] = ["Any", ...GENDERS];

  selectAllAvailable: FormControl = new FormControl(false);
  selectAllGroupContacts: FormControl = new FormControl(false);

  availableSearch: FormControl = new FormControl();
  availableGender: Gender = null;

  groupSearch: FormControl = new FormControl();
  groupGender: Gender = null;

  contacts: SelectableData<Contact>[];

  availabaleContacts: SelectableData<Contact>[];
  matchedAvailableContacts: SelectableData<Contact>[];

  groupContacts: SelectableData<Contact>[];
  matchedGroupContacts: SelectableData<Contact>[];

  resultMapping: any = resultPluralMapping
  spinnerMessage = "creating group"

  constructor(
    private route: ActivatedRoute,
    private server: GroupService,
    private contactService: ContactService,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {  
    // this.form.untouched
    const id = this.route.snapshot.params["id"];
    if(id){
      this.server.getOne(id).subscribe(s => {
        this.editing =true
        const data = s.payload.data()
        const group = new Group();
        Object.assign(group, data);
        if(!group.contactsId) group.contactsId = [];
        this.id = id;
        this.form = new GroupFormModel(group);
        this.getContacts();
      })
    }else{
      const group = new Group();
      this.form = new GroupFormModel(group);
      this.editing = false;
    }
  }

  submit(){
    if(this.form.invalid)return ;//form is invalid
    if(!this.editing){ //creating a new group
      const group = new Group();
      group.name = this.form.controls["name"].value;
      group.description = this.form.controls["description"].value

      this.saving = true;
      this.spinnerMessage = "creating group"
      this.server.create(group).then(g => {
        this.id = g.id;
        this.editing = true;
        this.saving = false ; //done saving
        this.interactionService.notify({
          context: {
            body: 'group created',
            status: 'success',
            icon: 'checkmark-outline',
            accent: 'success'
          }
        })
        
        this.getContacts();
      }).catch(e => {
        this.saving = false;
        this.interactionService.notify({
          context: {
            body: 'group creation failed',
            status: 'danger',
            icon: 'alert-circle-outline',
            accent: 'danger'
          }
        })        
      })
    }else{
      const group = new Group();
      group.name = this.form.controls["name"].value;
      group.description = this.form.controls["description"].value
      group.contactsId = this.form.group.contactsId

      this.saving = true;
      this.spinnerMessage = "updating group"
      this.server.update(group, this.id).then(g => {
        this.editing = true;
        this.saving = false ; //done saving
        this.interactionService.notify({
          context: {
            body: 'group updated',
            status: 'success',
            icon: 'checkmark-outline',
            accent: 'success'
          }
        })
      }).catch(e => {
        this.saving = false;
        this.interactionService.notify({
          context: {
            body: 'group update failed',
            status: 'danger',
            icon: 'alert-circle-outline',
            accent: 'danger'
          }
        })        
      })      
    }
  }

  private getContacts(){
    //get contacts 
    this.contactService.get().subscribe( cons => {
      this.contacts = cons.map(c => {
        const data = new Contact();
        Object.assign(data, c.payload.doc.data());
        return {
          selected: new FormControl(false),
          data: data,
          id: c.payload.doc.id
        }
      })

      this.filter();
    }) 
  }

  addContacts(){
    const toBeAdded = this.contactService.notIn(
      this.matchedAvailableContacts.filter(m => m.selected.value),
      this.groupContacts
    )
    this.form.group.contactsId.push(...toBeAdded.map(c => c.id));
    this.filter();

  }

  removeContacts(){
    const toRemain= this.contactService.notIn(
      this.groupContacts,
      this.matchedGroupContacts.filter(c => c.selected.value)
    ) 
    
    this.form.group.contactsId = toRemain.map(r => r.id);
    this.filter();
  }

  selectAll(e, available: boolean){
    
    if(available){
      this.selectAllAvailable.setValue(e);
      if(this.matchedAvailableContacts){
        this.matchedAvailableContacts.forEach(m => m.selected.setValue(e))
      }
    }else{
      this.selectAllGroupContacts.setValue(e);
      if(this.matchedGroupContacts){
        this.matchedGroupContacts.forEach(m => m.selected.setValue(e))
      }      
    }
  }

  selectOne(e,form: SelectableData<Contact>, available: boolean){
    if(available){
      if(!e && this.selectAllAvailable.value) {
        this.selectAllAvailable.setValue(false);
      }
      form.selected.setValue(e)
    }else{
      if(!e && this.selectAllGroupContacts.value) {
        this.selectAllGroupContacts.setValue(false);
      }
      form.selected.setValue(e)     
    }
  }

  filter(){
    if(!this.contacts) {
      this.contacts = [];
      this.availabaleContacts = [];
      this.groupContacts = [];
      return;
    }
    const groupContactsId = this.form && this.form.group && this.form.group.contactsId || [];
    this.groupContacts = this.contactService.isIn(
      this.contacts,
      groupContactsId.map((c): SelectableData<Contact> => ({
        id: c
      }))
    )

    this.availabaleContacts = this.contactService.notIn(
      this.contacts,
      this.groupContacts
    )

    this.filterAvailable();
    this.filterGroup();
  }

  filterAvailable(e?){
    //filter availabel contacts base on search
    this.selectAllAvailable.setValue(false); 
    if(e)this.availableGender = e;
    if(!this.availabaleContacts) {
      this.availabaleContacts = [];
      this.matchedAvailableContacts = [];
      return;
    }

    const contact = new Contact();
    contact.name = this.availableSearch.value
    contact.phone = this.availableSearch.value;
    if(this.availableGender === Gender.MALE) contact.gender = Gender.MALE;
    else if (this.availableGender === Gender.FEMALE) contact.gender = Gender.FEMALE
    else contact.gender = null;
    this.matchedAvailableContacts = this.contactService.filterContact(this.availabaleContacts, contact).map(c => ({
      selected: new FormControl(false),
      id: c.id,
      data: c.data
    }));
    
  }

  
  filterGroup(e?){
    this.selectAllGroupContacts.setValue(false);
    //filter availabel contacts base on search 
    if(e)this.groupGender = e;
    if(!this.groupContacts) {
      this.groupContacts = [];
      this.matchedGroupContacts = [];
      return;
    }

    const contact = new Contact();
    contact.name = this.groupSearch.value
    contact.phone = this.groupSearch.value;
    if(this.groupGender === Gender.MALE) contact.gender = Gender.MALE;
    else if (this.groupGender === Gender.FEMALE) contact.gender = Gender.FEMALE
    else contact.gender = null;
    this.matchedGroupContacts = this.contactService.filterContact(this.groupContacts, contact).map(c => ({
      selected: new FormControl(false),
      id: c.id,
      data: c.data
    }));
    
  }
}
