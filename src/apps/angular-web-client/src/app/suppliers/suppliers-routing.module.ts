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
export class SuppliersRoutingModule { }
