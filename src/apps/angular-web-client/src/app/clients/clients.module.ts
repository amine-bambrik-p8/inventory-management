import { CommonModule as AppCommonModule } from '@workspace/common';
import { AddComponent } from './add/add.component';
import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientsComponent, ViewComponent, EditComponent,AddComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    UiComponentsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppCommonModule
  ]
})
export class ClientsModule { }
