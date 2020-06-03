import { AddComponent } from './add/add.component';
import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SuppliersComponent, ViewComponent, EditComponent,AddComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    UiComponentsModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SuppliersModule { }
