import { ICategory, IProduct } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { CategoriesFacade, ProductsFacade } from '@workspace/core-data';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from '@workspace/ui-components';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories$:Observable<ICategory[]> = this.categories.allCategories$;
  products$:Observable<IProduct[]> = this.products.allProducts$;
  constructor(private categories:CategoriesFacade,private products:ProductsFacade,private router:Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }
  async loadData() {
    try {
      await this.categories.loadCategories();
      await this.products.loadProducts();
      
    } catch (error) {
      console.error("Failed to Load Data");
    }
  }

  onAdd(){
    this.router.navigate(["products","add"]);
  }
  onAddCategory(){
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {name:""}
    });

    dialogRef.afterClosed().subscribe(async (category:ICategory) => {
      if(category){
        try {
          await this.categories.addCategory(category);
        } catch (error) {
          console.error("Failed to create Category");
          console.error(error);
        }
      }
    });
  }
  onView(product:IProduct){
    this.router.navigate(["products",product._id]);
  }

}
