import { IProduct } from '@workspace/interfaces';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'workspace-product-grid-card',
  templateUrl: './product-grid-card.component.html',
  styleUrls: ['./product-grid-card.component.scss']
})
export class ProductGridCardComponent implements OnInit {
  @Input()
  product: IProduct;
  constructor() { }

  ngOnInit(): void {
  }

}
