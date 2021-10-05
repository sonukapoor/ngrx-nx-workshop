import { ApplicationRef, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  catchError,
  tap,
  switchMap,
  exhaustMap,
  mergeMap
} from 'rxjs/operators';
import { defer, of, timer } from 'rxjs';

import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';
import * as productDetailAction from '../product/product-details/actions';

import { CartService } from './cart.service';
import { timingSafeEqual } from 'crypto';
import { MatSnackBar } from '@angular/material/snack-bar';

const REFRESH_CART_ITEMS_INTERVAL_MS = 20 * 1000; // 20 seconds

@Injectable()
export class CartEffects {
  readonly fetchCartItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.timerTick,
        cartDetailsActions.pageOpened,
        cartDetailsActions.purchaseSuccess
      ),
      switchMap(() =>
        this.cartService.getCartProducts().pipe(
          map(cartItems => actions.fetchCartItemsSuccess({ cartItems })),
          catchError(() => of(actions.fetchCartItemsError()))
        )
      )
    )
  );

  readonly init$ = createEffect(() =>
    defer(() =>
      timer(0, REFRESH_CART_ITEMS_INTERVAL_MS).pipe(
        map(() => actions.timerTick())
      )
    )
  );

  readonly addToCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailAction.addToCart),
      mergeMap(({ productId }) => {
        return this.cartService.addProduct(productId).pipe(
          map(() => actions.addToCartSuccess()),
          catchError(() => of(actions.addToCartError({ productId })))
        );
      })
    );
  });

  handleAddProductError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.addToCartError),
        tap(() => {
          this.snackBar.open('Could not add item to the cart', 'Error', {
            duration: 2500
          });
          this.appRef.tick();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}
}
