import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddComponent } from './add/add.component';


const routes: Routes = [{
    path:'',
    component:ProductsComponent,
  },
  {
    path:'add',
    component:AddComponent
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
export class ProductsRoutingModule { }
