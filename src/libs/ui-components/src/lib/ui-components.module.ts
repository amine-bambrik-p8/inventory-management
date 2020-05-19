import { MaterialModule } from '@workspace/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartTableComponent } from './cart/cart-table/cart-table.component';
import { ProductGridCardComponent } from './products/product-grid-card/product-grid-card.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { OrderGridCardComponent } from './orders/order-grid-card/order-grid-card.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { SupplierGridCardComponent } from './suppliers/supplier-grid-card/supplier-grid-card.component';
import { UserGridCardComponent } from './users/user-grid-card/user-grid-card.component';
import { ClientGridCardComponent } from './clients/client-grid-card/client-grid-card.component';

@NgModule({
  imports: [CommonModule,MaterialModule],
  declarations: [CartTableComponent, ProductGridCardComponent, CalculatorComponent, OrderGridCardComponent, OrderInfoComponent,SupplierGridCardComponent, UserGridCardComponent, ClientGridCardComponent],
  exports: [CartTableComponent,ProductGridCardComponent,CalculatorComponent,OrderGridCardComponent,OrderInfoComponent, SupplierGridCardComponent, UserGridCardComponent,ClientGridCardComponent]
})
export class UiComponentsModule {}
