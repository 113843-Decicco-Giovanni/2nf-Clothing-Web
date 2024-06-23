import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PaymentService } from "../../services/payment.service";
import { EMPTY, catchError, map, mergeMap, of } from "rxjs";
import { GET_PAYMENT_STATUS_FAIL, GET_PAYMENT_STATUS_SUCCESS, getPaymentStatus, getPaymentStatusSuccess } from "../actions/payment.actions";
import Swal from "sweetalert2";

@Injectable ()
export class PaymentEffects {

    constructor(
        private actions$: Actions,
        private paymentService: PaymentService
    ) {}

    getPaymentStatus$ = createEffect(() => this.actions$.pipe(
        ofType(getPaymentStatus),
        mergeMap((action) => 
            this.paymentService.getPaymentStatus(action.paymentId)
                .pipe(
                    map(paymentStatus => ({type: GET_PAYMENT_STATUS_SUCCESS, paymentStatus})),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al comprobar el estado del pago',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return EMPTY
                    })
                )
        )
    ))
}