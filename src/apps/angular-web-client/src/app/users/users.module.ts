import { AddComponent } from './add/add.component';
import { MaterialModule } from '@workspace/material';
import { UiComponentsModule } from '@workspace/ui-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsersComponent, EditComponent, ViewComponent,AddComponent],
  imports: [
    CommonModule,
    UiComponentsModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
