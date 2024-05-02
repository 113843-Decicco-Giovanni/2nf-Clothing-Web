import { ActionReducerMap } from "@ngrx/store";
import { ArticlesState } from "./articles.state";
import { articlesReducer } from "../reducers/articles.reducer";
import { userReducer } from "../reducers/user.reducer";
import { UserState } from "./user.state";
import { clientsReducer } from "../reducers/clients.reducer";
import { ClientsState } from "./clients.state";
import { cartReducer } from "../reducers/cart.reducer";
import { CartState } from "./cart.state";

export interface AppState{
    articles: ArticlesState;
    user: UserState;
    clients: ClientsState;
    cart: CartState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    articles: articlesReducer,
    user: userReducer,
    clients: clientsReducer,
    cart: cartReducer
}