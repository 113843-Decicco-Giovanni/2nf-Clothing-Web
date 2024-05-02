import { Client } from "../../models/clients/client";

export interface ClientsState {
    client: any,
    clients: ReadonlyArray<Client>,
    logged: boolean,
    loading: boolean,
    added: boolean,
    deleted: boolean,
    updated: boolean
}