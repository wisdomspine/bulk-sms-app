import { Contact } from './contact.model';

export interface ContactWithId{
    contact: Contact,
    id: string;
}