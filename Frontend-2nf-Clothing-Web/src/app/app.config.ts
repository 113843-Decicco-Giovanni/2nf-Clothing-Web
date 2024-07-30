import { ApplicationConfig, LOCALE_ID, importProvidersFrom, isDevMode } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ArticlesEffects } from './store/effects/articles.effects';
import { ROOT_REDUCERS, loadState } from './store/states/app.state';
import { HttpClientModule } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UserEffects } from './store/effects/user.effects';
import { ClientsEffects } from './store/effects/clients.effects';
import { CartEffects } from './store/effects/cart.effects';
import { PaymentEffects } from './store/effects/payment.effects';
import { ShipmentsEffects } from './store/effects/shipments.effects';
import { SaleEfectts } from './store/effects/sale.effects';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { RefundEffects } from './store/effects/refund.effects';
import { DevolutionEffects } from './store/effects/devolution.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

const initialState = loadState();
registerLocaleData(localeEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore(ROOT_REDUCERS, { initialState }),
    { provide: LOCALE_ID, useValue: 'es' },
    provideEffects(
      [
        ArticlesEffects,
        UserEffects,
        ClientsEffects,
        CartEffects,
        PaymentEffects,
        ShipmentsEffects,
        SaleEfectts,
        RefundEffects,
        DevolutionEffects
      ]
      ),
    provideStoreDevtools(),
    importProvidersFrom(HttpClientModule),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
    provideCharts(withDefaultRegisterables()), provideAnimationsAsync(),
  ]
};
