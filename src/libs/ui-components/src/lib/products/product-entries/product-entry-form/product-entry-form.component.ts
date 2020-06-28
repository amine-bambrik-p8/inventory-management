import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProductEntry } from '@workspace/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
export class ProductEntryForm{
  constructor(protected fb:FormBuilder){}
  form:FormGroup;
  protected buildForm(value):void{
    const form:any = {
      boughtPrice:[""],
      discount:[""],
      price:[""],
      quantityInfo:this.fb.group({
        checkedInQuantity:[""],
      }),
      isDateInfoOn:[false],
    };
    if(value && value._id){
      form._id = this.fb.control([""]);
    }
    this.form = this.fb.group(form);
    this.form.get("isDateInfoOn").valueChanges.subscribe((isDateInfoOn)=>{
      if(isDateInfoOn)
        this.form.addControl("dates",this.fb.group({
          dateOfExpiration:[""],
          dateOfManufacturing:[""]
        }));
      else{
        this.form.removeControl("dates");
      }
    })
  }
  get isDateInfoOn(){
    return this.form.get("isDateInfoOn").value;
  }
  get value(){
    const {isDateInfoOn,...entry} = this.form.value;
    return entry;
  }
}
@Component({
  selector: 'workspace-product-entries-form',
  templateUrl: './product-entry-form.component.html',
  styleUrls: ['./product-entry-form.component.scss']
})
export class ProductEntryFormComponent extends ProductEntryForm implements OnInit {
  
  
  constructor(
    fb:FormBuilder,
    public dialogRef: MatDialogRef<ProductEntryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public initialValue: IProductEntry,
  ) {
    super(fb);
    this.buildForm(initialValue);
  }
  
  ngOnInit(): void {
    if(this.initialValue){
      this.form.patchValue(this.initialValue);
    }
  }
  onSubmit(): void{
    this.dialogRef.close(this.value);
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
