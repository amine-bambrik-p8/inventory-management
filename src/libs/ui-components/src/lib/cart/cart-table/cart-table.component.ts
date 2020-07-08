import { Component, OnInit, Input } from '@angular/core';
import { IOrderEntry } from '@workspace/interfaces';

@Component({
  selector: 'workspace-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.scss']
})
export class CartTableComponent implements OnInit {
  @Input()
  entries:IOrderEntry[];
  displayedColumns: string[] = ['product', 'quantity', 'unit', 'unit-price','discount','sub-total','action'];

  dataSource = [];
  constructor() { }

  ngOnInit(): void {
  }

}
