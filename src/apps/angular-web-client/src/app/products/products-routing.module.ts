import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [{
    path:'',
    component:ProductsComponent,
  },
  {
    path:':id',
    component:ViewComponent
  },
  {
    path:':id/edit',
    component:EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
