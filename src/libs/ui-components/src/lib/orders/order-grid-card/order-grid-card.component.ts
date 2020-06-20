import { Component, OnInit, Input } from '@angular/core';
import { IOrder, OrderStatus } from '@workspace/interfaces';

@Component({
  selector: 'workspace-order-grid-card',
  templateUrl: './order-grid-card.component.html',
  styleUrls: ['./order-grid-card.component.scss']
})
export class OrderGridCardComponent implements OnInit {
  @Input()
  order:IOrder;
  constructor() { }
  get isDelivered(){
    return this.order.orderStatus === OrderStatus.DELIVERED;
  }
  ngOnInit(): void {
  }

}
