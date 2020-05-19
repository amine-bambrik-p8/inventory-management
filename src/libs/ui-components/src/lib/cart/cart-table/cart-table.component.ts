import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workspace-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  displayedColumns: string[] = ['product', 'quantity', 'unit', 'unit-price','discount','sub-total','action'];

  dataSource = [];
  constructor() { }

  ngOnInit(): void {
  }

}
