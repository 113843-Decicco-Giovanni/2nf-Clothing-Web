import { CartDetail } from "../../models/cart/cartDetail";

export interface CartState {
    cart: CartDetail[];
    added: boolean;
    deleted: boolean;
    loading: boolean;
}