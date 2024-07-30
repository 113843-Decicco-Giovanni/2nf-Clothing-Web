export interface Refund {
    id: number;
    saleId: number;
    clientDoc: number;
    reason: string;
    state: string;
}