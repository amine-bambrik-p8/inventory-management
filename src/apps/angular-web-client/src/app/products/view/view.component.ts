import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '@workspace/interfaces';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ProductsFacade } from '@workspace/core-data';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  selectedProduct$:Observable<IProduct> = this.productsFacade.selectedProduct$;
  constructor(
    private productsFacade:ProductsFacade,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.loadData();
  }
  private async loadData() {
    try {
      const id = this.activatedRoute.snapshot.paramMap.get("id");
      await this.productsFacade.readProduct(id);
    } catch (error) {
      console.error(error);
    }
  }

  onEdit(product:IProduct){
    this.router.navigate(["products",product._id,"edit"]);
  }

}
