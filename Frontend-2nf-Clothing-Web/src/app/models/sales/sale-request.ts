import { ItemPreference } from "./ItemPreference";

export interface SaleRequest{
    clientId: number;
    items: ItemPreference[];
}