import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ArticlesEffects } from './store/effects/articles.effects';
import { ROOT_REDUCERS } from './store/states/app.state';
import { HttpClientModule } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';
import { ClientsEffects } from './store/effects/clients.effects';
import { CartEffects } from './store/effects/cart.effects';
import { PaymentEffects } from './store/effects/payment.effects';
import { ShipmentsEffects } from './store/effects/shipments.effects';
import { SaleEfectts } from './store/effects/sale.effects';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore(ROOT_REDUCERS),
    provideEffects(
      [
        ArticlesEffects,
        UserEffects,
        ClientsEffects,
        CartEffects,
        PaymentEffects,
        ShipmentsEffects,
        SaleEfectts
      ]
      ),
    provideStoreDevtools(),
    importProvidersFrom(HttpClientModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideCharts(withDefaultRegisterables())
  ]
};
