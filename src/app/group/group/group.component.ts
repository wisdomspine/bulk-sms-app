import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupService } from '../group.service';
import { Group, groupPluralMapping } from '../group.model';
import { SelectableData } from 'src/app/abstracts/data-server';
import { InteractionService } from 'src/app/utils/interaction/interaction.service';
import { APP_PATHS } from "../../paths";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  spinner: boolean = false;
  spinnerStatus : string="danger";
  spinnerMessage : string = "working...";

  groups: SelectableData<Group>[] = [];
  filteredGroups:SelectableData<Group>[] = []; 
  search: FormControl = new FormControl('');
  resultMapping: any = groupPluralMapping;
  
  selectAll: FormControl = new FormControl(false);

  editPath: string = '/'+APP_PATHS.newGroup;
  constructor(
    private server: GroupService,
    private interactionService: InteractionService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.server.get().subscribe(s => {
      this.groups = s.map(d => {
        const group = new Group();
        Object.assign(group, d.payload.doc.data());
        return {
          selected: new FormControl(false),
          data: group,
          id: d.payload.doc.id
        } 
      })
      this.filter();
    })
  }


  private filter(){
    this.filteredGroups = this.server.filterGroup(
      this.groups,
      this.search.value
    )
  }

  selectOne(e, s: SelectableData<Group>){
    if(!e){
      this.selectAll.setValue(false)
    }

    s.selected.setValue(e);
    
  }

  selectAllGroups(e){
    
    this.selectAll.setValue(e);
    this.filteredGroups.forEach(c => c.selected.setValue(e))
  }

  deleteOne(s: SelectableData<Group>){
    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete ${s.data.name}?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      if(r){
        this.server.delete(s.id)
        this.ref.detectChanges()
      }
    })
  }  

  deleteAll(){
    const toBeDeleted: SelectableData<Group>[] = this.filteredGroups.filter(s => s.selected.value)
    if(toBeDeleted.length <=0 )return;

    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete selected groups?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      
      if(r){
        this.spinner = true;
        this.spinnerMessage ="Deleting groups"
        Promise.all(toBeDeleted.map(tbd => this.server.delete(tbd.id))).then(() => {
          this.ref.detectChanges();
          this.spinner = false;
        }).catch(() => {
          this.spinner = false;
          this.interactionService.notify({
            context: {
              body: "not all groups were deleted",
              status: "danger"
            }
          })
        })
      }
    })    
  }

}


// import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
// import { Gender } from '../enum/gender.enum';
// import { FormControl } from '@angular/forms';
// import { ContactService} from './contact.service';
// import { Contact } from './contact.model';
// import { SelectableData, resultPluralMapping } from '../abstracts/data-server';

// import { InteractionService } from '../utils/interaction/interaction.service';
// import { EditContactService } from './edit-contact/edit-contact.service';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.scss']
// })
// export class ContactComponent implements OnInit{
//   genders: Gender[]|string[] = [
//     "Any",
//     Gender.FEMALE,
//     Gender.MALE
//   ]

//   gender: Gender = null;//gender of contacts to get
//   selectAll: FormControl = new FormControl(true);
//   contacts: SelectableData<Contact>[];
//   filteredContacts:SelectableData<Contact>[]; 
//   // subject: Subject<DynamicQueryInterface<Contact>>
//   search: FormControl = new FormControl('');//searc string
//   resultMapping: any = resultPluralMapping

//   spinner: boolean = false;
//   spinnerStatus: string = "danger";
//   spinnerMessage: string ="Deleting contacts";  
  
    
//   constructor(
//     public server: ContactService,
//     private ref:ChangeDetectorRef,
//     private interactionService: InteractionService,
//     private editContactService: EditContactService
//   ) { }

//   ngOnInit() {
//     this.server.get().subscribe(c => {
//       this.contacts = c.map(s => {
//         const contact = new Contact();
//         Object.assign(contact, s.payload.doc.data());
//         return ({selected: new FormControl(true), data: contact, id: s.payload.doc.id})
//       })
//       this.filter();
//     })
//   }

//   private filter(){
//     const contact = new Contact();
//     contact.name = this.search.value
//     contact.phone = this.search.value;
//     this.selectAll.setValue(false);
//     if(this.gender === Gender.MALE) contact.gender = Gender.MALE;
//     else if (this.gender === Gender.FEMALE) contact.gender = Gender.FEMALE
//     else contact.gender = null;
//     if(this.contacts){
//       this.filteredContacts = this.server.filterContact(this.contacts, contact).map(c => ({
//         selected: new FormControl(false),
//         id: c.id,
//         data: c.data
//       }));
//     }
//   }

//   selectOne(e, s: SelectableData<Contact>){
//     if(!e){
//       this.selectAll.setValue(false)
//     }

//     s.selected.setValue(e);
    
//   }

//   selectAllContacts(e){
    
//     this.selectAll.setValue(e);
//     this.filteredContacts.forEach(c => c.selected.setValue(e))
//   }

//   deleteOne(s: SelectableData<Contact>){
//     this.interactionService.confirm({
//       context: {
//         status: "danger",
//         message: `Proceed to delete ${s.data.contact}?\n this can't be undone`
//       }
//     }).onClose.subscribe(r => {
//       if(r){
//         this.server.delete(s.id)
//       }
//     })
//   }

//   deleteAll(){
//     const toBeDeleted: SelectableData<Contact>[] = this.filteredContacts.filter(s => s.selected.value)
//     if(toBeDeleted.length <=0 )return;

//     this.interactionService.confirm({
//       context: {
//         status: "danger",
//         message: `Proceed to delete selected contact?\n this can't be undone`
//       }
//     }).onClose.subscribe(r => {
      
//       if(r){
//         this.spinner = true;
//         Promise.all(toBeDeleted.map(tbd => this.server.delete(tbd.id))).then(s => {
//           this.spinner = false;
//         }).catch(e => {
//           this.spinner = false;
//           this.interactionService.notify({
//             context: {
//               body: "not all contacts were deleted",
//               status: "danger"
//             }
//           })
//         })
//       }
//     })    
//   }

//   edit(contact: SelectableData<Contact>){
//     this.editContactService.edit(contact.id);
//   }
  
// }
