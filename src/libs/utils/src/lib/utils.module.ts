import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderValuePipe } from './pipes/orders/order-value/order-value.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderValuePipe],
  exports:[
    OrderValuePipe
  ]
})
export class UtilsModule {}
