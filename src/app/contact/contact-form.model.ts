import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from './contact.model';
4
export class ContactFormModel extends FormGroup{
    contact: Contact;
    constructor(contact: Contact){
        super({
            gender: new FormControl(
                contact.gender || undefined
            ),
            name: new FormControl(
                contact.name || undefined,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(10)
                ]
            ),
            phone: new FormControl(
                contact.phone || undefined,
                [
                    Validators.required,
                    Validators.pattern(/e/)
                ]
            )
        })
        this.contact = contact? contact : new Contact();
    }
}