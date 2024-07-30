import { createAction, props } from "@ngrx/store";
import { SaleResponse } from "../../models/sales/responses/sale-response";

export const LOAD_SALES = '[sales] Load Sales';
export const LOAD_SALES_SUCCESS = '[sales] Load Sales Success';
export const LOAD_SALES_FAIL = '[sales] Load Sales Fail';

export const LOAD_SALE_BY_ID = '[sale] Load Sale By Id';
export const LOAD_SALE_BY_ID_SUCCESS = '[sale] Load Sale By Id Success';
export const LOAD_SALE_BY_ID_FAIL = '[sale] Load Sale By Id Fail';

export const UPDATE_PENDING_REFUND = '[sale] Update Pending Refund';
export const UPDATE_PENDING_REFUND_SUCCESS = '[sale] Update Pending Refund Success';
export const UPDATE_PENDING_REFUND_FAIL = '[sale] Update Pending Refund Fail';

export const loadSales = createAction(
    LOAD_SALES,
    props<{ fechaInicio: Date, fechaFin: Date, clientDoc: number }>()
)
export const loadSalesSuccess = createAction(
    LOAD_SALES_SUCCESS,
    props<{ sales: SaleResponse[] }>()
)
export const loadSalesFail = createAction(
    LOAD_SALES_FAIL
)

export const loadSaleById = createAction(
    LOAD_SALE_BY_ID,
    props<{ id: number }>()
)
export const loadSaleByIdSuccess = createAction(
    LOAD_SALE_BY_ID_SUCCESS,
    props<{ sale: SaleResponse }>()
)
export const loadSaleByIdFail = createAction(
    LOAD_SALE_BY_ID_FAIL
)
export const updatePendingRefund = createAction(
    UPDATE_PENDING_REFUND,
    props<{ id: number }>()
)
export const updatePendingRefundSuccess = createAction(
    UPDATE_PENDING_REFUND_SUCCESS
)
export const updatePendingRefundFail = createAction(
    UPDATE_PENDING_REFUND_FAIL
)