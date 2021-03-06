import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    UiComponentsModule,
    MaterialModule
  ]
})
export class CheckoutModule { }
