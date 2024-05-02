import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { ClientsState } from "../states/clients.state";

export const selectClientsFeature = (state: AppState) => state.clients

export const selectClients = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.clients
)
export const selectClient = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.client
)
export const selectClientsLoading = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.loading
)
export const selectClientAdded = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.added
)
export const selectClientDeleted = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.deleted
)
export const selectClientUpdated = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.updated
)
export const selectClientLogged = createSelector(
    selectClientsFeature,
    (state: ClientsState) => state.logged
)