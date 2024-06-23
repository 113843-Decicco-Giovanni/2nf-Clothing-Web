import { ActionReducerMap } from "@ngrx/store";
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

export interface AppState{
    articles: ArticlesState;
    user: UserState;
    clients: ClientsState;
    cart: CartState,
    payment: PaymentState,
    shipment: ShipmentState
    sale: SaleState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    articles: articlesReducer,
    user: userReducer,
    clients: clientsReducer,
    cart: cartReducer,
    payment: paymentReducer,
    shipment: shipmentReducer,
    sale: saleReducer
}