import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Gender } from '../enum/gender.enum';
import { FormControl } from '@angular/forms';
import { ContactService} from './contact.service';
import { Contact } from './contact.model';
import { SelectableData, resultPluralMapping } from '../abstracts/data-server';
import { I18nPluralPipe } from "@angular/common";
import { InteractionService } from '../utils/interaction/interaction.service';
import { EditContactService } from './edit-contact/edit-contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  genders: Gender[]|string[] = [
    "Any",
    Gender.FEMALE,
    Gender.MALE
  ]

  gender: Gender = null;//gender of contacts to get
  selectAll: FormControl = new FormControl(true);
  contacts: SelectableData<Contact>[];
  filteredContacts:SelectableData<Contact>[]; 
  // subject: Subject<DynamicQueryInterface<Contact>>
  search: FormControl = new FormControl('');//searc string
  resultMapping: any = resultPluralMapping

  spinner: boolean = false;
  spinnerStatus: string = "danger";
  spinnerMessage: string ="Deleting contacts";  
  
    
  constructor(
    public server: ContactService,
    private interactionService: InteractionService,
    private editContactService: EditContactService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.server.get().subscribe(c => {
      this.contacts = c.map(s => {
        const contact = new Contact();
        Object.assign(contact, s.payload.doc.data());
        return ({selected: new FormControl(true), data: contact, id: s.payload.doc.id})
      })
      this.filter();
    })
  }

  private filter(){
    const contact = new Contact();
    contact.name = this.search.value
    contact.phone = this.search.value;
    this.selectAll.setValue(false);
    if(this.gender === Gender.MALE) contact.gender = Gender.MALE;
    else if (this.gender === Gender.FEMALE) contact.gender = Gender.FEMALE
    else contact.gender = null;
    if(this.contacts){
      this.filteredContacts = this.server.filterContact(this.contacts, contact).map(c => ({
        selected: new FormControl(false),
        id: c.id,
        data: c.data
      }));
    }
  }

  selectOne(e, s: SelectableData<Contact>){
    if(!e){
      this.selectAll.setValue(false)
    }

    s.selected.setValue(e);
    
  }

  selectAllContacts(e){
    
    this.selectAll.setValue(e);
    this.filteredContacts.forEach(c => c.selected.setValue(e))
  }

  deleteOne(s: SelectableData<Contact>){
    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete ${s.data.contact}?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      if(r){
        this.server.delete(s.id);
        this.ref.detectChanges()
      }
    })
  }

  deleteAll(){
    const toBeDeleted: SelectableData<Contact>[] = this.filteredContacts.filter(s => s.selected.value)
    if(toBeDeleted.length <=0 )return;

    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete selected contact?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      
      if(r){
        this.spinner = true;
        Promise.all(toBeDeleted.map(tbd => this.server.delete(tbd.id))).then(s => {
          this.ref.detectChanges()
          this.spinner = false;
        }).catch(e => {
          this.spinner = false;
          this.interactionService.notify({
            context: {
              body: "not all contacts were deleted",
              status: "danger"
            }
          })
        })
      }
    })    
  }

  edit(contact: SelectableData<Contact>){
    this.editContactService.edit(contact.id);
  }
  
}
