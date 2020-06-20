import { StateModule } from './state/state.module';
import { UsersService } from './users/users.service';
import { SuppliersService } from './suppliers/suppliers.service';
import { ProductEntriesService } from './products/product-entries/product-entries.service';
import { ProductsService } from './products/products.service';
import { OrdersService } from './orders/orders.service';
import { ClientsService } from './clients/clients.service';
import { CategoriesService } from './categories/categories.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  providers:[
    CategoriesService,
    ClientsService,
    OrdersService,
    ProductsService,
    ProductEntriesService,
    SuppliersService,
    UsersService,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StateModule
  ]
})
export class CoreDataModule {}
