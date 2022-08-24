import { User } from './../../user-form/models/user';



import { map, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

import { AngularFirestore,  AngularFirestoreCollection,  AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  test: Observable<any[]>;
  itemsCollection: AngularFirestoreCollection<User>;
  itemDoc: AngularFirestoreDocument<User>;

  private user$ = new BehaviorSubject<any>({});
  selectedUser$ = this.user$.asObservable();

  users: Observable<User[]>;

  constructor(private httpClient:HttpClient, private fireStore:Firestore, private angularFire:AngularFirestore) { }

  getAllUsers():Observable<User[]> {

    this.itemsCollection = this.angularFire.collection('users');


    this.users = this.itemsCollection.snapshotChanges().pipe(map(changes=>changes.map(c=>({ id: c.payload.doc.id, ...c.payload.doc.data() }))));


    // const collectiona = collection(this.fireStore, 'users');
    // this.test = collectionData(collectiona);
    // this.test.subscribe(result=>{
    //   console.log("testt result",result)
    // })

    return this.users;
  }

  updateUser(user: User, id:any) {
    return this.angularFire
      .collection("posts")
      .doc(id)
      .update({
        name: user.name,
        lastName: user.lastName,
        email: user.email
      });
  }


  setUser(user: User) {
    console.log("user test button edit:", user)
    this.user$.next(user);
  }

  deleteUser(user: User){
    this.itemDoc = this.angularFire.doc(`users/${user.id}`);
    this.itemDoc.delete();
  }

}
