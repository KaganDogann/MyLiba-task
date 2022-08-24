import { Router } from '@angular/router';
import { User } from './../user-form/models/user';
import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from './services/user-data.service';
import parsedDataContent from '../../utils/parsedDataContent';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  userList: User[];

  constructor(private userDataService:UserDataService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userDataService.getAllUsers().subscribe(data=>{
      this.userList=data
    })
  }

 setUser(user:User){
  this.userService.selectUser(user)
 }

 deleteUser(user:User){
  this.userDataService.deleteUser(user);
  this.router.navigate(['']);
 }
}
