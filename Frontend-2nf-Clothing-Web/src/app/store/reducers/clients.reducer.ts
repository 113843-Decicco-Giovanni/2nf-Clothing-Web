import { createReducer, on } from "@ngrx/store";
import { ClientsState } from "../states/clients.state";
import { createClient, createClientFailed, createClientSuccess, loadClients, loadClientsFailed, loadClientsSuccess, loginClient, loginClientFailed, loginClientSuccess, logoutClient, logoutClientSuccess, updateClient, updateClientFailed, updateClientSuccess } from "../actions/client.actions";

export const initialState: ClientsState = {
    loading: false,
    clients: [],
    added: false,
    deleted: false,
    updated: false,
    client: null,
    logged: false
}

export const clientsReducer = createReducer(
    initialState,

    on(loginClient, (state) => ({ 
        ...state, 
        loading: true
    })),
    on(loginClientSuccess, (state, { client }) => ({
        ...state,
        loading: false,
        logged: true,
        client
    })),
    on(loginClientFailed, (state) => ({
        ...state,
        loading: false
    })),
    on(logoutClient, (state) => ({
        ...state,
        logged: false,
        client: null,
        loading: true
    })),
    on(logoutClientSuccess, (state) => ({
        ...state,
        loading: false
    })),
    on(createClient, (state) => ({
        ...state,
        loading: true
    })),
    on(createClientSuccess, (state, { client }) => ({
        ...state,
        loading: false,
        added: true,
        logged: true,
        client
    })),
    on(createClientFailed, (state) => ({
        ...state,
        loading: false
    })),
    on(updateClient, (state) => ({
        ...state,
        loading: true,
        updated: false
    })),
    on(updateClientSuccess, (state, { client }) => ({
        ...state,
        loading: false,
        updated: true,
        client
    })),
    on(updateClientFailed, (state) => ({
        ...state,
        loading: false
    })),
    on(loadClients, (state) => ({
        ...state,
        loading: true
    })),
    on(loadClientsSuccess, (state, { clients }) => ({
        ...state,
        loading: false,
        clients
    })),
    on(loadClientsFailed, (state) => ({
        ...state,
        loading: false
    }))
)