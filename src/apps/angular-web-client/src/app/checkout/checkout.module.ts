import { CommonModule as AppCommonModule } from '@workspace/common';
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
    MaterialModule,
    AppCommonModule
  ]
})
export class CheckoutModule { }
