import { UserItems } from './../models/userItems';

import { Injectable } from '@angular/core';
import { User } from '../components/user-form/models/user';
import { UserItem } from '../models/userItem';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  userItem = new UserItem();

  selectUser(user: User) {
    this.userItem.id = user.id;
    this.userItem.name = user.name;
    this.userItem.lastName = user.lastName;
    this.userItem.email = user.email;
    console.log("User item",this.userItem)

  }

  removeFromUserCart(){
    this.userItem.id = ""
    this.userItem.name = ""
    this.userItem.lastName = ""
    this.userItem.email = ""
  }

  list():User{
    return this.userItem;
  }
}
