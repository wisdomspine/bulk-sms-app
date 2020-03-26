import { Title } from '@angular/platform-browser';
import { SelectableData, DataServer } from '../abstracts/data-server';
import { Contact } from '../contact/contact.model';
import { ContactService } from '../contact/contact.service';
import { FormControl } from '@angular/forms';
import { Model } from '../abstracts/model';

export class Group extends Model{
    name: string;
    description: string;
    contactsId: string[] = []; // array of contacts id
    contacts: SelectableData<Contact>[] = [];

    getContacts(server: ContactService){
        server.get().subscribe(cs => {
            this.contacts = cs.map(c => {
                const contact = new Contact();
                Object.assign(contact, c.payload.doc.data());
                return ({selected: new FormControl(true), data: contact, id: c.payload.doc.id})                
            }).filter(c=> this.contactsId.find(id => id == c.id));
        })
    }
}

export const groupPluralMapping = {
    '=0' : 'empty',
    '=1' : '1 group',
    'other' : '# groups'
}