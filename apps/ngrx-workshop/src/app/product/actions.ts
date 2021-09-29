import { BasicProduct } from "@ngrx-nx-workshop/api-interfaces";
import { createAction, props } from "@ngrx/store";

export const productsFetched = createAction('[Products API] products fetched', props<{products: BasicProduct[]}>());
