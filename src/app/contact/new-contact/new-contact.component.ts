import { Component, OnInit } from '@angular/core';
import { RECORD_LENGTH_OPTIONS } from "../record-length-options";
import { ContactFormModel } from '../contact-form.model';
import { Contact } from '../contact.model';
import { Gender } from 'src/app/enum/gender.enum';
import { SpreadSheetService } from 'src/app/utils/spread-sheet.service';
import { SettingService } from 'src/app/setting/setting.service';
import { FileReaderService } from 'src/app/utils/file-reader.service';
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
  uploadedSheet: File;
  accepts: string= ".xlsx,.xlsm,.xlsb,.xls,.ods";
  fileErrors: {file:File,type:string}[] = [];

  constructor(
    public spreadSheetService: SpreadSheetService,
    public settingService: SettingService,
    public fileReaderService: FileReaderService
  ) { }

  ngOnInit() {
    this.initialize();
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

  initialize(){
    this.selected = 1;
    this.contactsForm = [];
    // this.uploadedSheet = {
    //   lastModified: null,
    //   size: null,
    //   name:null,
    //   slice: null,
    //   type: null
    // };
    this.fileErrors = [];
  }

  submit(form: ContactFormModel){
    console.log(form);
    form.contact.name
  }

  removeForm(form: ContactFormModel){
    this.removeForms(form);
  }

  private generateForms(contacts?: Contact[]){
    if(contacts){
      this.initialize();
      this.selected = contacts.length;
      this.appendForms(contacts);
    }
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

  async downloadConatactsSpreadSheet(){
    const contact:Contact = new Contact();
    contact.gender = null;
    contact.name = null;
    contact.phone = null;

    delete contact.date;
    delete contact.id;

    this.spreadSheetService.generateWorkBook({
      data: [contact],
    }).then(wb => this.spreadSheetService.downloadWorkBook(wb));
  }

  async uploadSpreadSheet(){
    this.fileReaderService.readAsBinaryString(this.uploadedSheet).then( d => {
      this.spreadSheetService.readWorkBook(d).then(wb => {
        const sheet: string = wb.SheetNames[0];
        this.spreadSheetService.readSheet(wb, sheet).then(s => {
          this.spreadSheetService.getJSON(s).then(j => {
            if(!j){
              //sheets tempered with
            }
            const rows: string[][] = j;
            if(rows.length > 1){
              const header = rows[0].map(h => h+"".toLocaleLowerCase());
              rows.shift();
              let contacts: Contact[] = rows.map(
                row => {
                  const contact: Contact = new Contact();
                  for(let i = 0; i< header.length; ++i){
                    const col = header[i];
                    const val = row[i];
                    if(col === 'gender'){
                      if(/^male|m$/ig.test(val)){
                        console.log(contact);
                        contact.gender = Gender.MALE;
                      }else if(/^female|f$/ig.test(val)){
                        contact.gender = Gender.FEMALE;
                      }else{
                        contact.gender = null;
                      }
                      continue;
                    }
                    contact[col] = val;
                  }
                  return contact;
                }
              )
              this.generateForms(contacts)
            }else{
              //empty sheets
            }
          }).catch(this.__handleUploadErrors).finally(this.__finalizeUpload)
        }).catch(this.__handleUploadErrors).finally(this.__finalizeUpload)
      }).catch(this.__handleUploadErrors).finally(this.__finalizeUpload)
    }).catch(this.__handleUploadErrors).finally(this.__finalizeUpload)
  }

  private __handleUploadErrors(e: any){

  }

  private __finalizeUpload(){

  }

}
