import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { SaleState } from "../states/sale.state";

export const selectSaleFeature = (state: AppState) => state.sale;

export const selectSales = createSelector(
    selectSaleFeature,
    (state: SaleState) => state.sales
)
export const selectSale = createSelector(
    selectSaleFeature,
    (state: SaleState) => state.sale
)
export const selectSalesLoading = createSelector(
    selectSaleFeature,
    (state: SaleState) => state.loading
)