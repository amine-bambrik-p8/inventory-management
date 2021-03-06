import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';


const routes: Routes = [{
    path:'',
    component:UsersComponent,
  },
  {
    path:'add',
    component:AddComponent,
  },
  {
    path:':id/edit',
    component:EditComponent
  },
  {
    path:':id',
    component:ViewComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
