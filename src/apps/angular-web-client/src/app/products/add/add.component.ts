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
  
  
  constructor(
    private productsFacade:ProductsFacade,
    private router:Router
    ) { }

  ngOnInit(): void {
  }



  async onSubmit(product:IProduct): Promise<void>{
    try {
      await this.productsFacade.addProduct(product);
      this.router.navigate(["products"]);
      
    } catch (error) {
      console.error(error);
    }
  }
}
