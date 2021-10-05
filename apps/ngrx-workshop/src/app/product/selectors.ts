import { GlobalState } from "./reducer";

export function getProducts(state: GlobalState  ) {
  return state.product.products;
}
