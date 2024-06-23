import { createReducer, on } from "@ngrx/store";
import { SaleState } from "../states/sale.state";
import { loadSaleById, loadSaleByIdSuccess, loadSales, loadSalesFail, loadSalesSuccess } from "../actions/sale.actions";

export const initialState: SaleState = {
    loading: false,
    sales: [],
    sale: null
}

export const saleReducer = createReducer(
    initialState,

    on(loadSales, (state) => {
        return {
            ...state,
            loading: true,
        }
    }),
    on(loadSalesSuccess, (state, { sales }) => {
        return {
            ...state,
            loading: false,
            sales
        }
    }),
    on(loadSalesFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(loadSaleById, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadSaleByIdSuccess, (state, { sale }) => {
        return {
            ...state,
            loading: false,
            sale
        }
    }),
    on(loadSalesFail, (state) => {
        return {
            ...state,
            loading: false
        }
    })
)