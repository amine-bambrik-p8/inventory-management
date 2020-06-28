import { IProduct } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { ProductsFacade } from '@workspace/core-data';
import { Router } from '@angular/router';

@Component({
  selector: 'workspace-product-grid-card',
  templateUrl: './product-grid-card.component.html',
  styleUrls: ['./product-grid-card.component.scss']
})
export class ProductGridCardComponent implements OnInit {
  @Input()
  product: IProduct;
  @Input()
  editable:boolean;
  constructor(private productsFacade:ProductsFacade,private router:Router) { }

  ngOnInit(): void {
  }
  onEdit(product:IProduct){
    this.router.navigate(["/products",product._id,"edit"]);
  }
  onDelete(product: IProduct){
    this.productsFacade.deleteProduct(product);
  }

}
