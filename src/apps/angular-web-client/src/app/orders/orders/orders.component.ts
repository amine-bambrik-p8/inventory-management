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
  selectedOrder$:Observable<IOrder> = this.orders.selectedOrder$;
  constructor(private orders:OrdersFacade) {
  }

  ngOnInit(): void {
    this.loadData();
  }
  async onSelectOrder(order:IOrder){
    const id:string = order._id;
    try {
      await this.orders.readOrder(id);
    } catch (error) {
      console.error(error);
    }
  }
  private async loadData() {
    try {
      await this.orders.loadOrders();
    } catch (error) {
      console.error(error);
    }
  }
}
