import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { inject } from "@angular/core";
import { AppState } from "../store/states/app.state";
import { Store } from "@ngrx/store";
import { selectUser, selectUserAdmin, selectUserLogged } from "../store/selectors/user.selector";

export const AuthGuardAdmin : CanActivateFn = (route, state) => {
    const router = inject(Router)
    const store = inject(Store<AppState>)

    return store.select(selectUserAdmin).pipe(
        tap((admin) => {
            if(!admin){
                router.navigate(['administration/articles'])
            }            
        })
    )
}