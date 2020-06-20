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
  
  constructor(
    private suppliersFacade:SuppliersFacade,
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }
  async onSubmit(supplier:ISupplier):Promise<void>{
    try {
      await this.suppliersFacade.addSupplier(supplier);
      this.router.navigate(["suppliers"]);
      
    } catch (error) {
      console.error(error);
    }
  }

}
