import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SaleServiceService } from "../../services/sale-service.service";
import { LOAD_SALES_SUCCESS, LOAD_SALE_BY_ID_SUCCESS, loadSaleById, loadSales } from "../actions/sale.actions";
import { mergeMap, map, catchError, EMPTY } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class SaleEfectts{
    constructor(
        private actions$: Actions,
        private service: SaleServiceService
    ){}

    loadSales$ = createEffect(() => this.actions$.pipe(
        ofType(loadSales),
        mergeMap((action) => this.service.getSales(action.fechaInicio, action.fechaFin, action.clientDoc)
            .pipe(
                map(sales => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Listado de ventas',
                        text: 'Se cargó con éxito el listado de ventas',
                        background: '#262626',
                        color: '#a7a7a7',
                        confirmButtonColor: '#a7a7a7'
                    })
                    return ({type: LOAD_SALES_SUCCESS, sales});
                }),
                catchError(() => EMPTY)
                )
            )
        )
    );

    loadSaleById$ = createEffect(() => this.actions$.pipe(
        ofType(loadSaleById),
        mergeMap((action) => this.service.getById(action.id)
            .pipe(
                map(sale => ({type: LOAD_SALE_BY_ID_SUCCESS, sale})),
                catchError(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error al cargar la venta',
                        background: '#262626',
                        color: '#a7a7a7',
                        confirmButtonColor: '#a7a7a7'
                    })
                    return EMPTY
                })
                )
            )
        )
    );
}