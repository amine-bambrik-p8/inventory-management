import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@workspace/ui-login';

const routes: Routes = [
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: 'sign-in', component: LoginComponent},
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule)},
  {path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)},
  {path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  {path: 'clients', loadChildren: () => import('./clients/clients.module').then(m=>m.ClientsModule)},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m=>m.UsersModule)},
  {path: 'suppliers', loadChildren: () => import('./suppliers/suppliers.module').then(m=>m.SuppliersModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}