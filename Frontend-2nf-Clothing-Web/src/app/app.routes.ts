import { Routes } from '@angular/router';
import { CustomerHomeComponent } from './customers/customers-home/customers-home.component';
import { AdminHomeComponent } from './administration/admin-home/admin-home.component';

export const routes: Routes = [
    {
        path: '',
        component: CustomerHomeComponent,
        loadChildren: () => 
            import('./customers/customer.routes')
                .then(m => m.CUSTOMER_ROUTES)
    },
    {
        path: 'administration',
        component: AdminHomeComponent,
        loadChildren: () => 
            import('./administration/administration.routes')
                .then(m => m.ADMINISTRATION_ROUTES)
    }
];
