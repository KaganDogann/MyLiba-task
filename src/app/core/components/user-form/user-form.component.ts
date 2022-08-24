import { Observable } from 'rxjs';
import { UserDataService } from './../user-data/services/user-data.service';

import { UserFormService } from './services/user-form.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  newUser: User;
  selectedUser: User = {
    id:"",
    name:"",
    lastName:"",
    email:""
  }
  editUserForm: boolean = false;
  ButtonName:string



  constructor(
    private formBuilder: FormBuilder,
    private userFormService: UserFormService,
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}

  userAddForm: FormGroup;



  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{

      if (params["id"]) {
        this.ButtonName="Update"
      } else {
        this.ButtonName="Add"
      }
    })


    this.createUserAddForm();
    this.getUser();
  }

  clearFormGroup(group: FormGroup) {
    group.markAsUntouched();
    group.reset();
  }

  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  createUser() {

    this.activatedRoute.params.subscribe(params=>{
      if (params["id"]) {
        var person = {
          id:this.selectedUser.id,
          name:this.newUser.name,
          lastName:this.newUser.lastName,
          email:this.newUser.email
       };
        this.updateUser(person);
        this.editUserForm = false;
        console.log(this.editUserForm)
        this.clearFormGroup(this.userAddForm);
        this.router.navigate(['']);
      }else {
        this.userFormService.createUser(this.newUser);
        this.clearFormGroup(this.userAddForm);
      }
    })
  }

  updateUser(user: User) {
    this.userFormService.updateUser(user);
  }

  save() {
    if (this.userAddForm.valid) {
      this.newUser = Object.assign({}, this.userAddForm.value);
      this.createUser();
      this.userService.removeFromUserCart();
    }
  }

  getUser(){
    this.selectedUser=this.userService.list()
  }
}
