import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RefundService } from "../../services/refund.service";
import { mergeMap, map, catchError, of } from "rxjs";
import { createRefund, createRefundSuccess, createRefundFail, getRefunds, getRefundsSuccess } from "../actions/refund.actions";
import Swal from "sweetalert2";

@Injectable()
export class RefundEffects {

    constructor(
        private actions$: Actions, 
        private refundService: RefundService) {}

    createRefund$ = createEffect(() => this.actions$.pipe(
        ofType(createRefund),
        mergeMap((action) => this.refundService.createRefund(action.refund).pipe(
            map((refund) => createRefundSuccess({ refund })),
            catchError((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al crear el reembolso',
                    background: '#262626',
                })
                return of(createRefundFail())})
        ))
    ))
    getRefunds$ = createEffect(() => this.actions$.pipe(
        ofType(getRefunds),
        mergeMap((action) => this.refundService.getRefunds(action.state, action.clientDoc, action.fechaInicio, action.fechaFin).pipe(
            map((refunds) => getRefundsSuccess({ refunds })),
            catchError((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                    background: '#262626',
                });
                return of(createRefundFail())})
        ))
    ))
}