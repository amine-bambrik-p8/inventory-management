import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IClient } from '@workspace/interfaces';

@Component({
  selector: 'workspace-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    firstName:[''],
    lastName:[''],
    address:this.fb.group({
      city:[''],
      address:[''],
      zip:[''],
    }),
    phoneNumber:[''],
    email:['']
  });
  @Output()
  formSubmit:EventEmitter<IClient> = new EventEmitter();
  @Input()
  set client(value:IClient){
    if(value._id){
      this.form.addControl("_id",this.fb.control(""));
    } 
    this.form.patchValue(value)
  }
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.formSubmit.emit(this.form.value);
  }
  
}
