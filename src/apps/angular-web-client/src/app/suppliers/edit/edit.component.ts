import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SuppliersFacade } from '@workspace/core-data';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ISupplier } from '@workspace/interfaces';
import { map, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form:FormGroup =this.fb.group({
    _id:[""],
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
  constructor(private suppliersFacade:SuppliersFacade,private fb:FormBuilder,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map((params:ParamMap)=>{
        return params.get("id");
      }),
      take(1)
    ).subscribe((id:string)=>{
      this.suppliersFacade.readSupplier(id);
    });
    this.suppliersFacade.selectedSupplier$
    .pipe(
      filter(supplier=>!!supplier),
      take(1)
    ).subscribe((supplier:ISupplier)=>{
      this.form.patchValue(supplier);
    });
  }
  onSubmit(){
    const supplier:ISupplier = this.form.value;
    this.suppliersFacade.updateSupplier(supplier);
    this.router.navigate(["suppliers"]);
  }
}
