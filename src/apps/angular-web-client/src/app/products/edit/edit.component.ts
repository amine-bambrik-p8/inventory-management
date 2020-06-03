import { Component, OnInit } from '@angular/core';
import { ProductsFacade, CategoriesFacade, SuppliersFacade } from '@workspace/core-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct, ISupplier, ICategory } from '@workspace/interfaces';
import { filter, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  suppliers$:Observable<ISupplier[]> = this.suppliersFacade.allSuppliers$;
  categories$:Observable<ICategory[]> = this.categoriesFacade.allCategories$;
  form:FormGroup = this.fb.group({
    _id:[""],
    categoryId:[""],
    name:[""],
    supplierId:[""],
    codebar:[""],
    description:[""],
    quantityAlert:this.fb.group({
      maxQuantity:[0],
      minQuantity:[0]
    }),
  });

  constructor(
    private productsFacade: ProductsFacade,
    private categoriesFacade: CategoriesFacade,
    private suppliersFacade: SuppliersFacade,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.categoriesFacade.loadCategories();
    this.suppliersFacade.loadSuppliers();
    const id: string = this.activatedRoute.snapshot.paramMap.get("id");
    this.productsFacade.readProduct(id);
    this.productsFacade.selectedProduct$
      .pipe(
        filter(product => !!product),
        take(1)
      ).subscribe((product: IProduct) => {
        this.form.patchValue(product);
      });
  }

  onSubmit(): void{
    const product:IProduct = this.form.value;
    this.productsFacade.updateProduct(product);
    this.router.navigate(["prodcuts"]);
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
