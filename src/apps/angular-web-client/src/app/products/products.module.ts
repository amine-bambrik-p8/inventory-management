import { AddComponent } from './add/add.component';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { MaterialModule } from '@workspace/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule as AppCommonModule } from '@workspace/common';


@NgModule({
  declarations: [ProductsComponent, ViewComponent, EditComponent,AddComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    UiComponentsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule
    
  ]
})
export class ProductsModule { }
