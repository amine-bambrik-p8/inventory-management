import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFilter, IOrder } from '@workspace/interfaces';

@Component({
  selector: 'workspace-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  filters:IFilter[]=[
    {
      value:"quantity",
      name:"Quantity"
    }
  ];

  @Input()
  orders: IOrder[] = [];
  @Output()
  selectOrder:EventEmitter<IOrder> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  onSelectOrder(order: IOrder){
    this.selectOrder.emit(order);
  }
}
