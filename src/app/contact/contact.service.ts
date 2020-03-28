import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, QueryFn, CollectionReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Contact } from './contact.model';
import { DataServer, SelectableData } from '../abstracts/data-server';

const collectionName = "contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService extends DataServer<Contact> implements OnInit{
  ngOnInit(): void {
    //this.create(new Contact()).then(console.log).catch(console.log).finally(()=>alert(99))
  }

  constructor(
    private firestore: AngularFirestore
  ) { 
    super(
      firestore,
      collectionName
    )
  }

  filterContact(data: SelectableData<Contact>[], condition: Contact): SelectableData<Contact>[]{
    if(!condition) return data;
    const name = new RegExp((condition.name || ''), 'ig');
    const gender = (condition.gender || null);
    const phone = (condition.phone || '').replace(/[^\d]*/, '') ? new RegExp((condition.phone || '').replace(/[^\d]*/, ''), 'ig') : null;
    return data.filter( d => {
      let isValid = false;
      const c = d.data;
      if(!c) return true;
      isValid = name.test(c.name) || (phone !==null? phone.test(c.phoneDigits) : false);
      //gender is the final predicate
      if(gender) isValid = isValid && gender === c.gender;
      return isValid;
    })
  }

  isIn(data: SelectableData<Contact>[], domain: SelectableData<Contact>[]): SelectableData<Contact>[]{
    if(!domain) return [];

    return data.filter(dat => domain.find(d => d.id == dat.id));
  }

  notIn(data: SelectableData<Contact>[], domain: SelectableData<Contact>[]): SelectableData<Contact>[]{
    if(!domain) return data;

    return data.filter(dat => !domain.find(d => d.id == dat.id));
  }

}

