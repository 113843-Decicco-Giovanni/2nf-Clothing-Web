import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminArticleListComponent } from "./articles/admin-article-list/admin-article-list.component";
import { AdminModifyArticleComponent } from "./articles/admin-modify-article/admin-modify-article.component";
import { AdminNewArticleComponent } from "./articles/admin-new-article/admin-new-article.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { NewUserComponent } from "./users/new-user/new-user.component";
import { UserProfileComponent } from "./users/user-profile/user-profile.component";
import { ClientsViewComponent } from "./clients/clients-view/clients-view.component";
import { AuthGuard } from "./auth.guard";
import { AuthGuardAdmin } from "./auth.guard.admin";

export const ADMINISTRATION_ROUTES: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'articles',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: AdminArticleListComponent
            },
            {
                path: 'new',
                component: AdminNewArticleComponent
            },
            {
                path: ':id',
                component: AdminModifyArticleComponent
            }
        ]
    },
    {
        path: 'users',
        canActivate: [AuthGuard, AuthGuardAdmin],
        canActivateChild: [AuthGuard, AuthGuardAdmin],
        children: [
            {
                path: '',
                component: UsersListComponent
            },
            {
                path: 'new',
                component: NewUserComponent
            }
        ]
    },
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
        path: 'clients',
        canActivate: [AuthGuard],
        component: ClientsViewComponent
    }
]