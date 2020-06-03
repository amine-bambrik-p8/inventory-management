import { Component, OnInit } from '@angular/core';
import { IUser } from '@workspace/interfaces';
import { UsersFacade } from '@workspace/core-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  form:FormGroup = this.fb.group({
    firstName:[""],
    lastName:[""],
    password:[""],
    username:[""],
    role:[""],
    confirmPassword:[""],
  });

  constructor(private usersFacade:UsersFacade,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    const user:IUser = this.form.value;
    this.usersFacade.addUser(user);
    this.router.navigate(["users"]);
  }
}
