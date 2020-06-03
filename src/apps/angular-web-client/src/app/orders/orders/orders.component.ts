import { IOrder } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { OrdersFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$:Observable<IOrder[]> = this.orders.allOrders$;
  //selectedOrder$:Observable<IOrder> = this.orders.selectedOrder$;
  selectedOrder:IOrder;
  constructor(private orders:OrdersFacade) {
  }

  ngOnInit(): void {
    this.orders.loadOrders();
  }

  

}
