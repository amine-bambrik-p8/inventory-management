import { IProduct } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { CategoriesFacade, ProductsFacade, CartFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
export enum LoadMode{
  VIEW="VIEW",
  SELECT="SELECT",
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$:Observable<IProduct[]> = this.products.allProducts$;
  mode:LoadMode = LoadMode.VIEW;
  constructor(
    private categories:CategoriesFacade,
    private products:ProductsFacade,
    private router:Router,
    public dialog: MatDialog,
    private activatedRoute:ActivatedRoute,
    private cartFacade:CartFacade
    ) { }

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.queryParamMap.get("mode") as LoadMode;
    this.loadData();
  }
  async loadData() {
    try {
      await this.products.loadProducts();
    } catch (error) {
      console.error("Failed to Load Data");
    }
  }

  onAdd(){
    this.router.navigate(["products","add"]);
  }
  
  onSelect(product:IProduct){
    if(this.mode === LoadMode.SELECT){
      this.cartFacade.addProductToCart(product);
      return this.router.navigate(["checkout"])
    }
    this.router.navigate(["products",product._id]);
  }

}
