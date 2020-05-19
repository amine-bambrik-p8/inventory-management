import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '@workspace/material';


@NgModule({
  declarations: [ProductsComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    UiComponentsModule,
    MaterialModule,
    
  ]
})
export class ProductsModule { }
