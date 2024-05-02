import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClientService } from "../../services/client.service";
import { EMPTY, catchError, map, mergeMap } from "rxjs";
import { CREATE_CLIENT_SUCCESS, GET_CLIENTS_SUCCESS, LOGIN_CLIENT_FAIL, LOGIN_CLIENT_SUCCESS, LOGOUT_CLIENT, LOGOUT_CLIENT_SUCCESS, UPDATE_CLIENT_SUCCESS, createClient, loadClients, loginClient, logoutClient, updateClient } from "../actions/client.actions";
import Swal from "sweetalert2";

@Injectable()
export class ClientsEffects {
    constructor(
        private actions: Actions,
        private service: ClientService
    ){}

    loginClient$ = createEffect(() => this.actions.pipe(
        ofType(loginClient),
        mergeMap((action) => 
            this.service.login(action.email, action.password)
                .pipe(
                    map(client => ({type: LOGIN_CLIENT_SUCCESS, client})),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error en las credenciales',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return EMPTY
                    })
                )
        )
    ))
    createClient$ = createEffect(() => this.actions.pipe(
        ofType(createClient),
        mergeMap((action) => 
            this.service.create(action.client)
                .pipe(
                    map(client => ({type: CREATE_CLIENT_SUCCESS, client})),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo registrar el cliente',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return EMPTY
                    })
                )
        )
    ))
    logoutClient$ = createEffect(() => this.actions.pipe(
        ofType(logoutClient),
        map(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cierre de sesión',
                text: 'Cierre de sesión exitoso',
                background: '#262626',
                color: '#a7a7a7',
            });
            return {type: LOGOUT_CLIENT_SUCCESS}
        }))
    )
    updateClient$ = createEffect(() => this.actions.pipe(
        ofType(updateClient),
        mergeMap((action) => 
            this.service.update(action.id, action.client)
                .pipe(
                    map(client => ({type: UPDATE_CLIENT_SUCCESS, client})),
                    catchError(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo actualizar el cliente',
                            background: '#262626',
                            color: '#a7a7a7',
                            confirmButtonColor: '#a7a7a7'
                        })
                        return EMPTY
                    })
                )
        )
    ))
    loadClients$ = createEffect(() => this.actions.pipe(
        ofType(loadClients),
        mergeMap(() => this.service.get()
            .pipe(
                map(clients => ({type: GET_CLIENTS_SUCCESS, clients})),
                catchError(() => EMPTY)
            )
        )
    ))
}