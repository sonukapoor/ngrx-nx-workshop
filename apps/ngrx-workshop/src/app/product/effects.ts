import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as productListActions from './product-list/actions';
import * as apiActions from './actions';
import { ProductService } from './product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProductEffects {
  readonly fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened),
      exhaustMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map(products => apiActions.productsFetchedSuccess({ products })),
            catchError(() => of(apiActions.productsFetchedError()))
          )
      )
    )
  );

  readonly handleFetchError$ = createEffect(
    () => this.actions$.pipe(
        ofType(apiActions.productsFetchedError),
        tap(() => {
          this.snackBar.open('Error fetching products', 'Error', {
            duration: 2500
          });
          this.appRef.tick();
        })),
    { dispatch: false }
  );


  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly appRef: ApplicationRef,
    private readonly snackBar: MatSnackBar
  ) {}
}
