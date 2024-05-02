import { Injectable } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Actions, act, createEffect, ofType } from "@ngrx/effects";
import { ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, addToCart, addToCartSuccess, removeFromCart, removeFromCartSuccess } from "../actions/cart.actions";
import { EMPTY, catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { selectCart } from "../selectors/cart.selector";
import Swal from "sweetalert2";

@Injectable()
export class CartEffects {
    
    constructor(
        private service: CartService,
        private actions: Actions,
        private store: Store<AppState>
    ){}

    addToCart$ = createEffect(() => this.actions.pipe(
        ofType(addToCart),
        withLatestFrom(this.store.select(selectCart)),
        map(([action, cart]) => {
            var updatedCart = this.service.addToCart(cart, action.detail)
            return addToCartSuccess({cart:updatedCart})
        })
    ))
    removeFromCart$ = createEffect(() => this.actions.pipe(
        ofType(removeFromCart),
        withLatestFrom(this.store.select(selectCart)),
        map(([action, cart]) => {
            var updatedCart = this.service.removeFromCart(cart, action.detailId)
            return removeFromCartSuccess({cart:updatedCart})
        })
    ))
}