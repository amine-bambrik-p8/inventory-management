import { Pipe, PipeTransform } from '@angular/core';
import { IOrder, IOrderEntry, IProductEntry } from '@workspace/interfaces';

@Pipe({
  name: 'orderValue'
})
export class OrderValuePipe implements PipeTransform {

  transform(order: IOrder, ...args: unknown[]): number {
    
    return order
    .entries
    .reduce(
      (currValue,orderEntry:IOrderEntry)=>{
        const productEntry: IProductEntry = orderEntry.productEntry;
        const price: number = productEntry.price * (1 - productEntry.discount);
        return currValue + orderEntry.quantity * price;
      }
    ,0.0);
  }

}
