import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ClientsComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    UiComponentsModule,
    MaterialModule
  ]
})
export class ClientsModule { }
