import { createAction, props } from "@ngrx/store";

export const addToCart = createAction('[Product Details] add product to cart', props<{productId: string}>());
