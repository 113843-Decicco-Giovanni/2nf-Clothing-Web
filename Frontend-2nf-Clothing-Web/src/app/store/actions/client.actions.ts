import { createAction, props } from "@ngrx/store";
import { Client } from "../../models/clients/client";
import { ClientRequest } from "../../models/clients/clientRequest";

export const CREATE_CLIENT = '[Client] Create Client';
export const CREATE_CLIENT_SUCCESS = '[Client] Create Client Success';
export const CREATE_CLIENT_FAIL = '[Client] Create Client Fail';

export const UPDATE_CLIENT = '[Client] Update Client';
export const UPDATE_CLIENT_SUCCESS = '[Client] Update Client Success';
export const UPDATE_CLIENT_FAIL = '[Client] Update Client Fail';

export const DELETE_CLIENT = '[Client] Delete Client';
export const DELETE_CLIENT_SUCCESS = '[Client] Delete Client Success';
export const DELETE_CLIENT_FAIL = '[Client] Delete Client Fail';

export const LOGIN_CLIENT = '[Client] Login Client';
export const LOGIN_CLIENT_SUCCESS = '[Client] Login Client Success';
export const LOGIN_CLIENT_FAIL = '[Client] Login Client Fail';

export const LOGOUT_CLIENT = '[Client] Logout Client';
export const LOGOUT_CLIENT_SUCCESS = '[Client] Logout Client Success';
export const LOGOUT_CLIENT_FAIL = '[Client] Logout Client Fail';

export const GET_CLIENTS = '[Client] Get Clients';
export const GET_CLIENTS_SUCCESS = '[Client] Get Clients Success';
export const GET_CLIENTS_FAIL = '[Client] Get Clients Fail';

export const createClient = createAction(
    CREATE_CLIENT,
    props<{ client: ClientRequest }>()
)
export const createClientSuccess = createAction(
    CREATE_CLIENT_SUCCESS,
    props<{ client: Client }>()
)
export const createClientFailed = createAction(
    CREATE_CLIENT_FAIL
)
export const loginClient = createAction(
    LOGIN_CLIENT,
    props<{ email: string, password: string }>()
)
export const loginClientSuccess = createAction(
    LOGIN_CLIENT_SUCCESS,
    props<{ client: Client }>()
)
export const loginClientFailed = createAction(
    LOGIN_CLIENT_FAIL
)
export const logoutClient = createAction(
    LOGOUT_CLIENT
)
export const logoutClientSuccess = createAction(
    LOGOUT_CLIENT_SUCCESS
)
export const updateClient = createAction(
    UPDATE_CLIENT,
    props<{ id: number, client: ClientRequest }>()
)
export const updateClientSuccess = createAction(
    UPDATE_CLIENT_SUCCESS,
    props<{ client: Client }>()
)
export const updateClientFailed = createAction(
    UPDATE_CLIENT_FAIL
)

export const loadClients = createAction(
    GET_CLIENTS
)
export const loadClientsSuccess = createAction(
    GET_CLIENTS_SUCCESS,
    props<{ clients: Client[] }>()
)
export const loadClientsFailed = createAction(
    GET_CLIENTS_FAIL
)