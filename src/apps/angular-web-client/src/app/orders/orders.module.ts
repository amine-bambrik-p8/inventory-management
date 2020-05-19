import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [OrdersComponent, ViewComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    UiComponentsModule,
    MaterialModule
  ]
})
export class OrdersModule { }
