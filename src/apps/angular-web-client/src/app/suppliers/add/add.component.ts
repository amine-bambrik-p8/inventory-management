import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SuppliersFacade } from '@workspace/core-data';
import { Router } from '@angular/router';
import { ISupplier } from '@workspace/interfaces';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
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
  constructor(private suppliersFacade:SuppliersFacade,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    
  }
  onSubmit(){
    const supplier:ISupplier = this.form.value;
    this.suppliersFacade.addSupplier(supplier);
    this.router.navigate(["suppliers"]);
  }

}
