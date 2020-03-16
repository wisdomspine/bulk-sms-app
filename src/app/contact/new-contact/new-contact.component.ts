import { Component, OnInit } from '@angular/core';
import { RECORD_LENGTH_OPTIONS } from "../record-length-options";
import { ContactFormModel } from '../contact-form.model';
import { Contact } from '../contact.model';
import { Gender } from 'src/app/enum/gender.enum';
@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  options: number[] = RECORD_LENGTH_OPTIONS;
  selected: number = 1;
  contactsForm: ContactFormModel[] = [];
  gender: Gender[] = [
    Gender.FEMALE,
    Gender.MALE
  ]
  constructor() { }

  ngOnInit() {
    this.generateForms();
  }

  selectedChange(event){
    this.selected = event;
    this.generateForms();
  }

  resetAll(){
  
  }

  submitAll(){
    
  }

  submit(form: ContactFormModel){
    console.log(form);
    form.contact.name
  }

  removeForm(form: ContactFormModel){
    this.removeForms(form);
  }

  private generateForms(){
    if(this.contactsForm.length < this.selected){
      let i = this.contactsForm.length ;
      const appendees: Contact[] = [];
      for( ; i< this.selected; ++i){
        appendees.push(new Contact());
      }
      this.appendForms(appendees);
    }else if(this.contactsForm.length > this.selected){
      let i = this.contactsForm.length - this.selected;
      this.removeForms(i);
    }
  };

  private appendForms(contacts: Contact[] | Contact){
    if(!Array.isArray(contacts))contacts = [contacts];
    for(let contact of contacts){
      let contactForm = new ContactFormModel(contact)
      this.contactsForm.push(contactForm);
      console.log(contactForm);
    }
  }

  private removeForms(forms: number | ContactFormModel){
    //edge speifies to splice 
    if(forms instanceof ContactFormModel){
      const index = this.contactsForm.findIndex(f => {
        return f === forms
      });

      index >=0 ? this.contactsForm.splice(index, 1) : null;
    }else if(typeof forms === "number"){
      if(forms > 0){
        this.contactsForm.splice(this.selected, forms);
      }
    }
  }


}
