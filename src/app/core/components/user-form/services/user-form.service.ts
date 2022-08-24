import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserFormService {
  constructor(private angularFire: AngularFirestore) {}

  itemsCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  itemDoc: AngularFirestoreDocument<User>;

  createUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.angularFire
        .collection('users')
        .add({ ...user })
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  updateUser(user:User) {
    this.itemDoc = this.angularFire.doc(`users/${user.id}`);
    this.itemDoc.update(user);
  }
}
