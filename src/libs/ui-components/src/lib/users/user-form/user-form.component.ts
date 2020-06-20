import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUser, Role } from '@workspace/interfaces';

@Component({
  selector: 'workspace-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form:FormGroup = this.fb.group({
    firstName:[""],
    lastName:[""],
    username:[""],
    role:[""]
  });
  @Input()
  set user(value:IUser) {
    if(value._id){
      this.form.addControl("_id",this.fb.control(""));
    } else{
      this.onResetPassword();
    }
    this.form.patchValue(value);
  }
  @Output()
  formSubmit:EventEmitter<IUser> = new EventEmitter();
  constructor(
    private fb:FormBuilder,
  ) { }

  get isResetPasswordOn(){
    return this.form.get("password") && this.form.get("confirmPassword");
  }
  
  onResetPassword(){
    this.form.addControl("password",this.fb.control([""]));
    this.form.addControl("confirmPassword",this.fb.control([""]));
  }
  get roles(){
    return Object.keys(Role).filter(key=>typeof key === "string");
  }
  ngOnInit(): void {
  }
  onSubmit(){
    this.formSubmit.emit(this.form.value);
  }
}
