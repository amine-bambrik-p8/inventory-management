import { FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ICategory } from '@workspace/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'workspace-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form = this.fb.group({
    name:[""],
  })
  constructor(
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) category: ICategory,
    private fb:FormBuilder
  ) {
    this.form.patchValue(category);
  }

  ngOnInit(): void {
  }
  onSubmit(){

  }
  onClose(): void {
    this.dialogRef.close();
  }
}
