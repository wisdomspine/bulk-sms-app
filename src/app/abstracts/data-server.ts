import { AngularFirestore, QueryFn, DocumentChangeAction, DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Subject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export abstract class DataServer <T>{
    constructor(protected store: AngularFirestore, public collection: string){

    }

    get(filter?: QueryFn){
        if(filter) return this.store.collection<T>(this.collection, filter).snapshotChanges()
        else return this.store.collection<T>(this.collection).snapshotChanges();
        this.store.collection<T>(this.collection, ref => ref.limit(90))
    }

    getDynamic(): {subject: Subject<DynamicQueryInterface<T>>, observable: Observable<DocumentChangeAction<T>[]>}{
        const subject$ = new Subject<DynamicQueryInterface<T>>();
        const observable= subject$.pipe(
            switchMap(fn => {
                const limit = fn && fn.limit || Number.POSITIVE_INFINITY;
                const startAt = fn && fn.startAt || null;

                return this.store.collection<T>(this.collection, ref => {
                    let data = null;
                    if(limit){
                        data = ref.limit(limit);
                    }
                    return data
                }).snapshotChanges()
                
            })
        );
        return {subject:subject$, observable};
    }

    create(data: T){
        const parsed = JSON.parse(JSON.stringify(data));
        parsed.id = Date.now();
        return this.store.collection<T>(this.collection).add(parsed);
    }

    update(data:T, id: number|string){
        const parsed = JSON.parse(JSON.stringify(data));
        return this.store.doc<T>(this.collection+"/"+id).update(parsed);
    }

    delete(id:string|number){
        return this.store.doc(this.collection+"/"+id).delete();
    }

    getOne(id: number | string){
        return this.store.doc(this.collection+"/"+id).snapshotChanges()
    }
}

export interface DynamicQueryInterface<T> {
    limit?: number;
    startAt?: DocumentSnapshot<T>
}

export interface SelectableData<T> {
    id?: string;
    selected?: FormControl;
    data?: T
}

export const resultPluralMapping = {
    '=0' : 'empty',
    '=1' : '1 contact',
    'other' : '# contacts'
}