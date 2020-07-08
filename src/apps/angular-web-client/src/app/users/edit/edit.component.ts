import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersFacade } from '@workspace/core-data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IUser } from '@workspace/interfaces';
import { map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form:FormGroup = this.fb.group({
    _id:[""],
    firstName:[""],
    lastName:[""],
    username:[""],
    role:[""],
  });
  get isResetPasswordOn(){
    return this.form.get("password") && this.form.get("confirmPassword");
  }
  constructor(private usersFacade:UsersFacade,private fb:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.onLoadData();
  }

  onResetPassword(){
    this.form.addControl("password",this.fb.control([""]));
    this.form.addControl("confirmPassword",this.fb.control([""]));
  }

  onSubmit(){
    const user:IUser = this.form.value;
    this.usersFacade.addUser(user);
    this.router.navigate(["users"]);
  }

  onLoadData() {
    const id: string = this.activatedRoute.snapshot.paramMap.get("id");
    this.usersFacade.readUser(id);
    this.usersFacade.selectedUser$
      .pipe(
        filter(user => !!user), 
        take(1)
      )
      .subscribe((user: IUser) => {
        this.form.patchValue(user);
      });
  }
}
