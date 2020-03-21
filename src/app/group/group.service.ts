import { Injectable } from '@angular/core';
import { DataServer } from '../abstracts/data-server';
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
}
