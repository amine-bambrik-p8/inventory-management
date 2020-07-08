import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductsFacade, CategoriesFacade, SuppliersFacade } from '@workspace/core-data';
import { IProduct, ICategory, ISupplier } from '@workspace/interfaces';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  categories$:Observable<ICategory[]> = this.categoriesFacade.allCategories$;
  suppliers$:Observable<ISupplier[]> = this.suppliersFacade.allSuppliers$;
  form:FormGroup = this.fb.group({
    codebar:[""],
    name:[""],
    categoryId:[""],
    supplierId:[""],
    description:[""],
    
  });
  get isQuantityAlertOn(): boolean{
    return !!this.form.get("quantityAlert");
  }
  constructor(
    private productsFacade:ProductsFacade,
    private categoriesFacade:CategoriesFacade,
    private suppliersFacade:SuppliersFacade,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.categoriesFacade.loadCategories();
    this.suppliersFacade.loadSuppliers();
  }

  onSubmit(): void{
    const product:IProduct = this.form.value;
    this.productsFacade.addProduct(product);
    this.router.navigate(["products"]);
  }
  onToggleQuantityAlert(): void{
    const quantityAlert = this.form.get("quantityAlert");
    if(quantityAlert){
      this.form.removeControl("quantityAlert");
      return;
    }
    this.form.addControl("quantityAlert",
      this.fb.group({
          maxQuantity:[0],
          minQuantity:[0]
      })
    );
  }
  
}
