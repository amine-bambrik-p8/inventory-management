import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component:SuppliersComponent,
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
export class SuppliersRoutingModule { }
