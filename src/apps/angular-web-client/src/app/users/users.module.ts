import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [UsersComponent, EditComponent, ViewComponent],
  imports: [
    CommonModule,
    UiComponentsModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
