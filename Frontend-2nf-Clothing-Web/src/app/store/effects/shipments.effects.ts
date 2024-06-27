import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { confirmShipment, confirmShipmentSuccess, loadShipmentById, loadShipmentByIdSuccess, loadShipmentBySaleId, loadShipmentBySaleIdSuccess, loadShipments, loadShipmentsSuccess, modifyShipment, processShipment, processShipmentSuccess } from "../actions/shipment.actions";
import { ShipmentService } from "../../services/shipment.service";
import Swal from "sweetalert2";

@Injectable()
export class ShipmentsEffects {
    constructor(
        private actions: Actions,
        private service: ShipmentService
    ) {}

    confirmShipment$ = createEffect(() => this.actions.pipe(
        ofType(confirmShipment),
        mergeMap((action) => {
            return of(confirmShipmentSuccess({shipment: action.shipment}))
        })
    ));

    loadShipments$ = createEffect(() => this.actions.pipe(
        ofType(loadShipments),
        mergeMap((action) => {
            return this.service.getShipments(action.estado, action.fechaInicio, action.fechaFin, action.clientDoc)
                .pipe(
                    map(shipments => {
                        return(loadShipmentsSuccess({shipments}))
                    }),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al cargar el listado de envios',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return of({type: 'loadShipmentsFail'})
                    })
                )
        })
    ));

    loadShipmentById$ = createEffect(() => this.actions.pipe(
        ofType(loadShipmentById),
        mergeMap((action) => {
            return this.service.getShipmentById(action.id)
                .pipe(
                    map(shipment => loadShipmentByIdSuccess({shipment})),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al cargar el envío',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return of({type: 'loadShipmentByIdFail'})
                    })
                )
        })
    ));

    loadShipmentBySaleId$ = createEffect(() => this.actions.pipe(
        ofType(loadShipmentBySaleId),
        mergeMap((action) => {
            return this.service.getShipmentBySaleId(action.saleId)
                .pipe(
                    map(shipmentResponse => loadShipmentBySaleIdSuccess({shipmentResponse})),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al cargar el envío',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return of({type: 'loadShipmentBySaleIdFail'})
                    })
                )
        })
    ));

    processShipment$ = createEffect(() => this.actions.pipe(
        ofType(processShipment),
        mergeMap((action) => {
            return this.service.processShipment(action.shipmentId, action.service, action.trackingId)
                .pipe(
                    map(shipment => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Envío procesado',
                            text: 'Envío procesado correctamente',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return processShipmentSuccess({shipmentResponse: shipment})
                    }),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al procesar el envío',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return of({type: 'processShipmentFail'})
                    })
                )
        })  
    ));

    modifyShipment$ = createEffect(() => this.actions.pipe(
        ofType(modifyShipment),
        mergeMap((action) => {
            return this.service.modifyShipment(action.id, action.shipment)
                .pipe(
                    map(shipment => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Envío modificado',
                            text: 'Envío modificado correctamente',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return processShipmentSuccess({shipmentResponse: shipment})
                    }),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al modificar el envío',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return of({type: 'modifyShipmentFail'})
                    })
                )
        })
    ));
}