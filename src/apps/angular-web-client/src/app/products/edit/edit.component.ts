import { Component, OnInit } from '@angular/core';
import { ProductsFacade, CategoriesFacade, SuppliersFacade } from '@workspace/core-data';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct, ISupplier, ICategory } from '@workspace/interfaces';
import { take} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  suppliers$:Observable<ISupplier[]> = this.suppliersFacade.allSuppliers$;
  categories$:Observable<ICategory[]> = this.categoriesFacade.allCategories$;
  selectedProduct$:Observable<IProduct> = this.productsFacade.selectedProduct$;
  constructor(
    private productsFacade: ProductsFacade,
    private categoriesFacade: CategoriesFacade,
    private suppliersFacade: SuppliersFacade,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    try {
      this.categoriesFacade.loadCategories();
      this.suppliersFacade.loadSuppliers();
      const id: string = this.activatedRoute.snapshot.paramMap.get("id");
      this.productsFacade.readProduct(id);  
    } catch (error) {
      console.error(error);
    }
    
  }

  async onSubmit(product:IProduct): Promise<void>{
    try {
      await this.productsFacade.updateProduct(product);
      this.router.navigate(["/products"]);
    } catch (error) {
      console.error(error);
    }
  }

}
