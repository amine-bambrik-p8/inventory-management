import { MaterialModule } from '@workspace/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModule as AppCommonModule } from '@workspace/common';
import { CartTableComponent } from './cart/cart-table/cart-table.component';
import { ProductGridCardComponent } from './products/product-grid-card/product-grid-card.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { OrderGridCardComponent } from './orders/order-grid-card/order-grid-card.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { SupplierGridCardComponent } from './suppliers/supplier-grid-card/supplier-grid-card.component';
import { UserGridCardComponent } from './users/user-grid-card/user-grid-card.component';
import { ClientGridCardComponent } from './clients/client-grid-card/client-grid-card.component';
import { ProductEntryComponent } from './products/product-entry/product-entry.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { ClientInfoComponent } from './clients/client-info/client-info.component';
import { ProductEntriesListComponent } from './products/product-entries/product-entries-list/product-entries-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { SupplierFormComponent } from './suppliers/supplier-form/supplier-form.component';
import { SupplierInfoComponent } from './suppliers/supplier-info/supplier-info.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { UtilsModule } from "@workspace/utils";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppCommonModule,
    UtilsModule
  ],
  declarations: [
    CartTableComponent,
    ProductGridCardComponent,
    CalculatorComponent,
    OrderGridCardComponent,
    OrderInfoComponent,
    SupplierGridCardComponent,
    UserGridCardComponent,
    ClientGridCardComponent,
    ProductEntryComponent,
    CategoryFormComponent,
    ClientFormComponent,
    OrdersListComponent,
    ClientInfoComponent,
    ProductEntriesListComponent,
    ProductFormComponent,
    ProductInfoComponent,
    SupplierFormComponent,
    SupplierInfoComponent,
    UserFormComponent,
    UserInfoComponent
  ],
  entryComponents:[CategoryFormComponent],
  exports: [
    CartTableComponent,
    ProductGridCardComponent,
    CalculatorComponent,
    OrderGridCardComponent,
    OrderInfoComponent, 
    SupplierGridCardComponent, 
    UserGridCardComponent,
    ClientGridCardComponent,
    ProductEntryComponent,
    CategoryFormComponent,
    ClientFormComponent, 
    OrdersListComponent,
    ClientInfoComponent,
    ProductEntriesListComponent,
    ProductFormComponent,
    ProductInfoComponent,
    SupplierFormComponent,
    SupplierInfoComponent,
    UserFormComponent,
    UserInfoComponent
  ]
})
export class UiComponentsModule {}
