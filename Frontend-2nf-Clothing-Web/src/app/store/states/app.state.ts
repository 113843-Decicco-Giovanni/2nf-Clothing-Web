import { ActionReducerMap, State } from "@ngrx/store";
import { ArticlesState } from "./articles.state";
import { articlesReducer } from "../reducers/articles.reducer";
import { userReducer } from "../reducers/user.reducer";
import { UserState } from "./user.state";
import { clientsReducer } from "../reducers/clients.reducer";
import { ClientsState } from "./clients.state";
import { cartReducer } from "../reducers/cart.reducer";
import { CartState } from "./cart.state";
import { PaymentState } from "./payment.state";
import { paymentReducer } from "../reducers/payment.reducer";
import { ShipmentState } from "./shipment.state";
import { shipmentReducer } from "../reducers/shipments.reducer";
import { SaleState } from "./sale.state";
import { saleReducer } from "../reducers/sale.reducer";
import { DevolutionState } from "./devolution.state";
import { devolutionReducer } from "../reducers/devolution.reducer";
import { RefundState } from "./refund.state";
import { refundReducer } from "../reducers/refund.reducer";

export interface AppState{
    articles: ArticlesState;
    user: UserState;
    clients: ClientsState;
    cart: CartState;
    payment: PaymentState;
    shipment: ShipmentState;
    sale: SaleState;
    devolution: DevolutionState;
    refund: RefundState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    articles: articlesReducer,
    user: userReducer,
    clients: clientsReducer,
    cart: cartReducer,
    payment: paymentReducer,
    shipment: shipmentReducer,
    sale: saleReducer,
    devolution: devolutionReducer,
    refund: refundReducer
}

export const loadState = (): AppState | undefined => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState == null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state: AppState): void => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (err) {
      // Ignore write errors.
    }
  };