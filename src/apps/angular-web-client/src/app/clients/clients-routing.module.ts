import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ClientsComponent } from './clients/clients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';


const routes: Routes = [
  {
    path:'',
    component:ClientsComponent,
  },
  
  {
    path:"add",
    component:AddComponent
  },
  {
    path:":id/edit",
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
export class ClientsRoutingModule { }
