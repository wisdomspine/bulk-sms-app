import { Injectable } from '@angular/core';
import { DataServer, SelectableData } from '../abstracts/data-server';
import { AngularFirestore, QueryFn, CollectionReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Group } from './group.model';
const collectionName = "group";
@Injectable({
  providedIn: 'root'
})

export class GroupService extends DataServer<Group>{

  constructor(private firestore: AngularFirestore) {
    super(
      firestore,
      collectionName
    )
   }

   filterGroup(data: SelectableData<Group>[], search: string): SelectableData<Group>[]{
    const regExp = new RegExp((search || ''), 'ig');
    return data.filter( d => {
      return regExp.test(d.data.name) || regExp.test(d.data.description);
    })
  }

}
