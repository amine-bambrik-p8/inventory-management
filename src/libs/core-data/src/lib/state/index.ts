import { UsersState, usersReducers } from './users/users.reducer';
import { SuppliersState, suppliersReducers } from './suppliers/suppliers.reducer';
import { ProductsState, productsReducers } from './products/products.reducer';
import { OrdersState, ordersReducers } from './orders/orders.reducer';
import { ClientsState, clientsReducers } from './clients/clients.reducer';
import { CategoriesState, categoriesReducers } from './categories/categories.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    categories: CategoriesState;
    clients: ClientsState;
    orders: OrdersState;
    products: ProductsState;
    suppliers: SuppliersState;
    users: UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducers,
    clients: clientsReducers,
    orders: ordersReducers,
    products: productsReducers,
    suppliers: suppliersReducers,
    users: usersReducers,
};


