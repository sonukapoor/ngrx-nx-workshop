import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, tap, switchMap, exhaustMap } from 'rxjs/operators';
import { defer, of, timer } from 'rxjs';

import * as actions from './actions';
import * as cartDetailsActions from './cart-details/actions';

import { CartService } from './cart.service';

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

  constructor(
    private readonly actions$: Actions,
    private readonly cartService: CartService
  ) {}
}
