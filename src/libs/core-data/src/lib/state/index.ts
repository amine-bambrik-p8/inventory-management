import { CalculatorState, calculatorReducer } from './calculator/calculator.reducer';
import { CartState, cartReducer } from './cart/cart.reducer';
import { ProductsActions } from './products/products.actions';
import { UsersState, usersReducers } from './users/users.reducer';
import { SuppliersState, suppliersReducers } from './suppliers/suppliers.reducer';
import { ProductsState, productsReducers, initialState } from './products/products.reducer';
import { OrdersState, ordersReducers } from './orders/orders.reducer';
import { ClientsState, clientsReducers } from './clients/clients.reducer';
import { CategoriesState, categoriesReducers } from './categories/categories.reducer';
import { ActionReducerMap, combineReducers, } from '@ngrx/store';

export interface AppState{
    categories: CategoriesState;
    clients: ClientsState;
    orders: OrdersState;
    products: ProductsState;
    suppliers: SuppliersState;
    users: UsersState;
    cart: CartState;
    calculator: CalculatorState;
}

export const reducers: ActionReducerMap<AppState> = {
    categories: categoriesReducers,
    clients: clientsReducers,
    orders: ordersReducers,
    products: productsReducers,
    suppliers: suppliersReducers,
    users: usersReducers,
    cart: cartReducer,
    calculator: calculatorReducer,
};


