import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { inject } from "@angular/core";
import { AppState } from "../store/states/app.state";
import { Store } from "@ngrx/store";
import { selectUserLogged } from "../store/selectors/user.selector";

export const AuthGuard : CanActivateFn = (route, state) => {
    const router = inject(Router)
    const store = inject(Store<AppState>)

    return store.select(selectUserLogged).pipe(
        tap((logged) => {
            if(!logged){
                router.navigate(['administration'])
            }            
        })
    )
}

export const AuthGuardLogin : CanActivateFn = (route, state) => {
    const router = inject(Router)
    const store = inject(Store<AppState>)

    return store.select(selectUserLogged).pipe(
        tap((logged) => {
            if(logged){
                router.navigate(['administration/articles'])
            }            
        })
    )
}