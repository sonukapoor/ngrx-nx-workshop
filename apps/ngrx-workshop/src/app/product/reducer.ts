import { Product } from '@ngrx-nx-workshop/api-interfaces';
import { data } from '@ngrx-nx-workshop/data';
import { Action } from '@ngrx/store';

export function reducer(state: ProductState = initState, action: Action) {
  return state;
}

export interface ProductState {
  products: Product[];
}

const initState: ProductState = {
  products: data
};
