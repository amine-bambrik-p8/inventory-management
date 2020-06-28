import { ISupplier } from '@workspace/interfaces';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
export class SupplierForm {
  form:FormGroup;
  constructor(private fb:FormBuilder){}
  protected buildForm(value){
    const form:any = {
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
    }
    if(value && value._id){
      form._id = [""];
    }
    this.form=this.fb.group(form);
  }
  get value(){
    return this.form.value;
  }
}
@Component({
  selector: 'workspace-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent extends SupplierForm implements OnInit {
  
  @Input()
  set supplier(value:ISupplier){
    this.buildForm(value);
    if(value)
    this.form.patchValue(value);
  }
  @Output()
  formSubmit:EventEmitter<ISupplier> = new EventEmitter();
  constructor(
    fb:FormBuilder,
  ) { super(fb)}

  ngOnInit(): void {
  }

}
