import { ISupplier } from '@workspace/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'workspace-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  form:FormGroup =this.fb.group({
    name:[""],
    contact:this.fb.group({
      email:[""],
      firstName:[""],
      lastName:[""],
      phoneNumber:[""]
    }),
    address:this.fb.group({
      address:[""],
      city:[""],
      zip:[""],
    }),
  });
  @Input()
  set supplier(value:ISupplier){
    if(value._id){
      this.form.addControl("_id",this.fb.control(""));
    } 
    this.form.patchValue(value);
  }
  @Output()
  formSubmit:EventEmitter<ISupplier> = new EventEmitter();
  constructor(
    private fb:FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.formSubmit.emit(this.form.value);
  }

}
