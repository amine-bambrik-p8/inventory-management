import { IOrder, ICartItem, IClient } from '@workspace/interfaces';
import { Component, OnInit } from '@angular/core';
import { OrdersFacade, CartFacade, ClientsFacade } from '@workspace/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$:Observable<IOrder[]> = this.orders.allOrders$;
  selectedOrder$:Observable<IOrder> = this.orders.selectedOrder$;
  selectedOrderAsCart$:Observable<ICartItem[]> = this.orders.selectedOrderAsCart$;
  selectedClient$:Observable<IClient> = this.clients.selectedClient$;
  constructor(
    private orders:OrdersFacade,
    private clients:ClientsFacade
    ) {
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
  async onLoadClient(order:IOrder){
    if(!order || !order.client){
      return this.clients.unsetSelecetedClient();
    }
    const clientId:string = order.client.id;
    this.clients.readClient(clientId);
  }
  private async loadData() {
    try {
      await this.orders.loadOrders();
    } catch (error) {
      console.error(error);
    }
  }
  
}
