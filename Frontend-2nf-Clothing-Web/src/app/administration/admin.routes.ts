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
import { ArticleComponent } from "./articles/article-component/article.component";
import { SalesComponent } from "./sales/sales.component";
import { ShipmentsComponent } from "./shipments/shipments.component";
import { SaleDetailComponent } from "./sale-detail/sale-detail.component";
import { ShipmentDetailComponent } from "./shipment-detail/shipment-detail.component";
import { ShipmentModifyComponent } from "./shipment-modify/shipment-modify.component";
import { SalesByDayComponent } from "./reports/sales-by-day/sales-by-day.component";
import { SalesByMonthComponent } from "./reports/sales-by-month/sales-by-month.component";
import { BilledAmountByDayComponent } from "./reports/billed-amount-by-day/billed-amount-by-day.component";
import { BilledAmountByMonthComponent } from "./reports/billed-amount-by-month/billed-amount-by-month.component";
import { DevolutionsListComponent } from "./devolutions-list/devolutions-list.component";
import { RefundsListComponent } from "./refunds-list/refunds-list.component";
import { DevolutionDetailsComponent } from "./devolution-details/devolution-details.component";

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
                component: ArticleComponent
            },
            {
                path: 'modify/:id',
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
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: UserProfileComponent
    },
    {
        path: 'clients',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ClientsViewComponent
    },
    {
        path: 'sales',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:[
            {
                path: '',
                component: SalesComponent
            },
            {
                path: ':id',
                component: SaleDetailComponent
            },
            
        ]
    },
    {
        path:'shipments',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:[
            {
                path: '',
                component: ShipmentsComponent
            },
            {
                path: ':id',
                component: ShipmentDetailComponent
            },
            {
                path: 'modify/:id',
                component: ShipmentModifyComponent
            }
        ]
    },
    {
        path: 'devolutions',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:[
            {
                path: '',
                component: DevolutionsListComponent
            },
            {
                path: ':id',
                component: DevolutionDetailsComponent
            }
        ]
    },
    // {
    //     path: 'refunds',
    //     canActivate: [AuthGuard],
    //     canActivateChild: [AuthGuard],
    //     children:[
    //         {
    //             path: '',
    //             component: RefundsListComponent
    //         }
    //     ]
    // },
    {
        path: 'reports',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children:[
            {
                path: 'sales-by-day',
                component: SalesByDayComponent
            },
            {
                path: 'sales-by-month',
                component: SalesByMonthComponent
            },
            {
                path: 'billed-amount-by-day',
                component: BilledAmountByDayComponent
            },
            {
                path: 'billed-amount-by-month',
                component: BilledAmountByMonthComponent
            }
        ]
    }
]