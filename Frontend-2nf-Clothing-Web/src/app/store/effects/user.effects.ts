import { Injectable } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ADD_USER_SUCCESS, CHANGE_ACTIVE_USER_SUCCESS, CHANGE_ADMIN_USER_SUCCESS, LOAD_USERS_SUCCESS, LOGIN_USER, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, UPDATE_USER_SUCCESS, addUser, changeActiveUser, changeAdminUser, loadUsers, loginUser, loginUserFail, updateUser } from "../actions/user.actions";
import { EMPTY, catchError, map, mergeMap } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class UserEffects {
    

    constructor(
        private actions$: Actions,
        private service: UserService
    ) {}

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(loginUser),
        mergeMap((action) => 
            this.service.loginRequest(action.userName, action.password)
                .pipe(
                    map(user => ({type: LOGIN_USER_SUCCESS, user})),
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
        ))
    )
    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(loadUsers),
        mergeMap((action) => this.service.getUsers(action.adminId)
            .pipe(
                map(users => ({type: LOAD_USERS_SUCCESS, users})),
                catchError(() => EMPTY)
            )
        )
    ))
    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(addUser),
        mergeMap((action) => this.service.newUser(action.adminId, action.userName, action.email, action.password)
            .pipe(
                map(user => ({type: ADD_USER_SUCCESS, user})),
                catchError(() => EMPTY)
            )
        )
    ))
    updateUser$ = createEffect(() => this.actions$.pipe(
        ofType(updateUser),
        mergeMap((action) => this.service.updateUser(action.userId, action.userName, action.email, action.password, action.newPassword)
            .pipe(
                map(user => ({type: UPDATE_USER_SUCCESS, user})),
                catchError(() => EMPTY)
            )
        )
    ))
    changeAdminUser$ = createEffect(() => this.actions$.pipe(
        ofType(changeAdminUser),
        mergeMap((action) => this.service.changeAdmin(action.adminId, action.userId)
            .pipe(
                map(user => ({type: CHANGE_ADMIN_USER_SUCCESS, user})),
                catchError(() => EMPTY)
            )
        )
    ))
    changeActiveUser$ = createEffect(() => this.actions$.pipe(
        ofType(changeActiveUser),
        mergeMap((action) => this.service.changeActive(action.adminId, action.userId)
            .pipe(
                map(user => ({type: CHANGE_ACTIVE_USER_SUCCESS, user})),
                catchError(() => EMPTY)
            )
        )
    ))
}