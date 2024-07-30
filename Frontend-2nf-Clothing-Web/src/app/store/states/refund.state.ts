import { Refund } from "../../models/refunds/refund";

export interface RefundState {
    refunds: Refund[];
    refund: Refund | null;
    loading: boolean;
    added: boolean;
    deleted: boolean;
}