import { CommonModule as AppCommonModule } from '@workspace/common';
import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [OrdersComponent,],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    UiComponentsModule,
    CommonModule,
    AppCommonModule,
    MaterialModule
  ]
})
export class OrdersModule { }
