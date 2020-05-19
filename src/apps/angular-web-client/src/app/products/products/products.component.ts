import { Component, OnInit } from '@angular/core';
import { CategoriesFacade } from '@workspace/core-data';
import { of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  categories$ = this.categories.allCategories$;
  constructor(private categories:CategoriesFacade) { }

  ngOnInit(): void {
    this.categories$.subscribe((e)=>console.log("hello",e))
    this.categories.loadCategories()
  }

}
