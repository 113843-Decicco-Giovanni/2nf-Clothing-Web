import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DevolutionService } from "../../services/devolution.service";
import { AppState } from "../states/app.state";
import { Store } from "@ngrx/store";
import { mergeMap, map, catchError, of } from "rxjs";
import { createDevolution, createDevolutionSuccess, createDevolutionFail, getDevolutions, getDevolutionsSuccess, getDevolutionsFail, updateDevolutionState, updateDevolutionStateFail, updateDevolutionStateSuccess, getDevolutionById, getDevolutionSuccess, getDevolutionFail, getDevolutionByShipmentId } from "../actions/devolution.actions";
import Swal from "sweetalert2";

@Injectable()
export class DevolutionEffects {

    constructor(
        private actions$: Actions, 
        private service: DevolutionService,
        private store: Store<AppState>
    ){}

    createDevolution$ = createEffect(() => this.actions$.pipe(
        ofType(createDevolution),
        mergeMap((action) => this.service.createDevolution(action.devolution).pipe(
            map((devolution) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Devolución creada',
                    text: 'Se ha creado la devolución, atención al cliente se comunicará a la brevedad.',
                    background: '#262626',
                    color: '#a7a7a7',
                    confirmButtonColor: '#a7a7a7'
                })
                return createDevolutionSuccess({ devolution })
            }),
            catchError((err) => of(createDevolutionFail()))
        ))
    ))

    getDevolutions$ = createEffect(() => this.actions$.pipe(
        ofType(getDevolutions),
        mergeMap((action) => this.service.getDevolutions(action.state, action.dni, action.fechaInicio, action.fechaFin).pipe(
            map((devolutions) => getDevolutionsSuccess({ devolutions })),
            catchError((err) => of(getDevolutionsFail()))
        ))
    ))

    updateDevolutionState$ = createEffect(() => this.actions$.pipe(
        ofType(updateDevolutionState),
        mergeMap((action) => this.service.updateDevolutionState(action.devolutionId, action.state, action.detail).pipe(
            map((devolution) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Devolución actualizada',
                    text: 'Se ha actualizado la devolución',
                    background: '#262626',
                    color: '#a7a7a7',
                    confirmButtonColor: '#a7a7a7'
                })
                return updateDevolutionStateSuccess({ devolution })}),
            catchError((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar la devolución',
                    background: '#262626',
                    color: '#a7a7a7',
                    confirmButtonColor: '#a7a7a7'
                })
                return of(updateDevolutionStateFail())})
        ))
    ))

    getDevolutionById$ = createEffect(() => this.actions$.pipe(
        ofType(getDevolutionById),
        mergeMap((action) => this.service.getDevolutionById(action.id).pipe(
            map((devolution) => getDevolutionSuccess({ devolution })),
            catchError((err) => of(getDevolutionFail()))
        ))
    ))

    getDevolutionByShipmentId$ = createEffect(() => this.actions$.pipe(
        ofType(getDevolutionByShipmentId),
        mergeMap((action) => this.service.getDevolutionByShipmentId(action.shipmentId).pipe(
            map((devolution) => getDevolutionSuccess({ devolution })),
            catchError((err) => of(getDevolutionFail()))
        ))
    )) 
}