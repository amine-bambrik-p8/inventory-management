import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
    path:'',
    component:UsersComponent,
  },
  {
    path:':id',
    component:ViewComponent
  },
  {
    path:':id/edit',
    component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
