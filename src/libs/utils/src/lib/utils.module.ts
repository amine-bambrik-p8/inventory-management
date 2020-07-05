import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderValuePipe } from './pipes/orders/order-value/order-value.pipe';
import { ProductEntryValuePipe } from './pipes/product-entries/product-entry-value.pipe';
import { ProductMainEntryPipe } from './products/product-main-entry/product-main-entry.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    OrderValuePipe,
    ProductEntryValuePipe,
    ProductMainEntryPipe
  ],
  exports:[
    OrderValuePipe,
    ProductEntryValuePipe,
    ProductMainEntryPipe
  ]
})
export class UtilsModule {}
