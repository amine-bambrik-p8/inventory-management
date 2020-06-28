import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ICategory } from '@workspace/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class CategoryForm{
  form:FormGroup;
  constructor(private fb:FormBuilder){}
  protected buildForm(value:ICategory){
    const form:any = {
      name:[""],
    };
    if(value && value._id){
      form._id = [""];
    }
    this.form =  this.fb.group(form);
  }
}
@Component({
  selector: 'workspace-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends CategoryForm implements OnInit {
  constructor(
    fb:FormBuilder,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
     @Inject(MAT_DIALOG_DATA) private initialValue: ICategory,
  ) {
    super(fb);

  }

  ngOnInit(): void {
    this.buildForm(this.initialValue);
    if(this.initialValue)
      this.form.patchValue(this.initialValue);
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
