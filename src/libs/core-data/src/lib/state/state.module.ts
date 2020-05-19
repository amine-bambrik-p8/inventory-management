import { CategoriesFacade } from './categories/categories.facade';
import { UsersEffects } from './users/users.effects';
import { OrdersEffects } from './orders/orders.effects';
import { ClientsEffects } from './clients/clients.effects';
import { CategoriesEffects } from './categories/categories.effects';
import { reducers } from './index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedEnvironment as environment } from '@workspace/environments';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SuppliersEffects } from './suppliers/suppliers.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CategoriesEffects,
      ClientsEffects,
      OrdersEffects,
      UsersEffects,
      SuppliersEffects,
      UsersEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ]
})
export class StateModule { }
