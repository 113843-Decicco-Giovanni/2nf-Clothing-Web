import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

export const ADMINISTRATION_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    }
]