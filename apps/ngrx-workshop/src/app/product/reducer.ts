import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { data } from '@ngrx-nx-workshop/data';
import { createReducer, on } from '@ngrx/store';
import * as apiActions from './actions';

export interface GlobalState {
  product: ProductState;
}

const initState: ProductState = {
  products: data
};

export const productsReducer = createReducer(
  initState,
  on(apiActions.productsFetched, (state, { products }) => ({
    ...state,
    products: [...products]
  }))
);

export interface ProductState {
  products: Product[];
}
