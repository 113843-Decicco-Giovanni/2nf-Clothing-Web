import { Routes } from "@angular/router";
import { ArticlesViewComponent } from "./articles-view/articles-view.component";

export const CUSTOMER_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ArticlesViewComponent
    }
]