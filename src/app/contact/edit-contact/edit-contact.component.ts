import { Component, OnInit, Input } from '@angular/core';
import { ContactFormModel } from '../contact-form.model';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Gender, GENDERS } from 'src/app/enum/gender.enum';
import { ToastrTitle } from 'src/app/utils/interaction/toastr';
import { InteractionService } from 'src/app/utils/interaction/interaction.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  @Input() id : number | string;

  form: ContactFormModel;
  gender: Gender[] = GENDERS
  formRetrieved: boolean = false;
  updating: boolean = false;
  
  constructor(
    private ref: NbDialogRef<EditContactComponent>,
    private server: ContactService,
    private toastrService: NbToastrService,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    this.server.getOne(this.id).subscribe(c => {
      const  data = c.payload.data();
      const contact = new Contact();

      Object.assign(contact, data);
      this.form = new ContactFormModel(contact);
      this.formRetrieved = true;
    })
  }

  close(value: string = null){
    this.ref.close(value);
  } 
  
  submit(){
    if(this.form.invalid) return;

    const contact = new Contact();
    contact.date = new Date().toISOString()
    contact.gender = this.form.contact.gender;
    contact.name = this.form.controls.name.value? this.form.controls.name.value.replace(/[^A-Za-z0-9_\s'-]/gi, '') : null;
    contact.phone = this.form.controls.phone.value;
    this.updating = true;
    this.server.update(contact, this.id).then(s => {
      this.updating = false
      this.close();
    }).catch(e => {
      this.updating = false;
      this.toastrService.danger('Contact not updated', ToastrTitle.DANGER);
    })
  }

  delete(){
    this.interactionService.confirm({
      context: {
        status: "danger",
        message: `Proceed to delete?\n this can't be undone`
      }
    }).onClose.subscribe(r => {
      if(r){
        this.server.delete(this.id).then(e => {
          this.close();
        }).catch(e => {
          this.toastrService.danger('Contact not deleted', ToastrTitle.DANGER);
        })
      }
    })
  }  

}
