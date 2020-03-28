import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from './contact.model';
import { phoneValidator } from '../directives/validators/validate-phone';

export class ContactFormModel extends FormGroup{
    contact: Contact;
    uploading: boolean = false;
    constructor(contact: Contact){
        super({
            gender: new FormControl(
                contact.gender || undefined
            ),
            name: new FormControl(
                contact.name || undefined,
                [
                    Validators.minLength(3),
                    Validators.pattern(/^([\w'-]+\s?)*$/i)
                ]
            ),
            phone: new FormControl(
                contact.phone || undefined,
                [
                    Validators.required,
                    phoneValidator()
                ]
            )
        })
        this.contact = contact? contact : new Contact();
    }
}