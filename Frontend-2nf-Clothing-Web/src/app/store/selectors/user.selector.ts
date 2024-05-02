import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { UserState } from "../states/user.state";

export const selectUserFeature = (state: AppState) => state.user;

export const selectUser = createSelector(
    selectUserFeature,
    (state: UserState) => state.user
)
export const selectUserLoading = createSelector(
    selectUserFeature,
    (state: UserState) => state.loading
)
export const selectUserAdded = createSelector(
    selectUserFeature,
    (state: UserState) => state.added
)
export const selectUserDeleted = createSelector(
    selectUserFeature,
    (state: UserState) => state.deleted
)
export const selectUserLogged = createSelector(
    selectUserFeature,
    (state: UserState) => state.logged
)
export const selectUserAdmin = createSelector(
    selectUserFeature,
    (state: UserState) => state.user.isUserAdmin
)
export const selectUsers = createSelector(
    selectUserFeature,
    (state: UserState) => state.users
)
export const selectUserUpdated = createSelector(
    selectUserFeature,
    (state: UserState) => state.updated
)