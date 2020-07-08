import { ICategory, IProduct } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { CategoriesFacade, ProductsFacade } from '@workspace/core-data';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories$:Observable<ICategory[]> = this.categories.allCategories$;
  products$:Observable<IProduct[]> = this.products.allProducts$;
  constructor(private categories:CategoriesFacade,private products:ProductsFacade,private router:Router) { }

  ngOnInit(): void {
    this.categories.loadCategories();
    this.products.loadProducts();
  }
  onAdd(){
    this.router.navigate(["products","add"]);
  }
  onView(product:IProduct){
    this.router.navigate(["products",product._id]);
  }

}
