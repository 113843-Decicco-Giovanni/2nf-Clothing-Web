import { SaleResponse } from "../../models/sales/responses/sale-response";

export interface SaleState{
    loading: boolean;
    sales: SaleResponse[];
    sale: SaleResponse | null;
}