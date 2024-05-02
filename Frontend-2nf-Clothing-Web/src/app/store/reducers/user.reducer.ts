import { createReducer, on } from "@ngrx/store";
import { addUser, addUserFail, addUserSuccess, changeActiveUser, changeActiveUserFail, changeActiveUserSuccess, changeAdminUser, changeAdminUserFail, changeAdminUserSuccess, loadUsers, loadUsersFail, loadUsersSuccess, loginUser, loginUserFail, loginUserSuccess, logoutUser, updateUser, updateUserFail, updateUserSuccess } from "../actions/user.actions";
import { UserState } from "../states/user.state";

export const initialState: UserState = {
    loading: false,
    user: null,
    users: [],
    logged: false,
    added: false,
    deleted: false,
    updated: false
}

export const userReducer = createReducer(
    initialState,

    on(loginUser, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loginUserSuccess, (state, { user }) => {
        return {
            ...state,
            loading: false,
            logged: true,
            user
        }
    }),
    on(loginUserFail, (state) =>{
        return {
            ...state,
            loading: false
        }
    }),
    on(logoutUser, (state) => {
        return {
            ...state,
            logged: false,
            user: null
        }
    }),
    on(loadUsers, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadUsersSuccess, (state, { users }) => {
        return {
            ...state,
            loading: false,
            users
        }
    }),
    on(loadUsersFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(addUser, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(addUserSuccess, (state) => {
        return {
            ...state,
            loading: false,
            added: true
        }
    }),
    on(addUserFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(updateUser, (state) => {
        return {
            ...state,
            loading: true,
            updated: false
        }
    }),
    on(updateUserSuccess, (state, { user }) => {
        return {
            ...state,
            loading: false,
            added: true,
            updated: true,
            user
        }
    }),
    on(updateUserFail, (state) => {
        return {
            ...state,
            loading: false,
            updated: false
        }
    }),
    on(changeAdminUser, (state) => {
        return {
            ...state,
            loading: true,
            updated: false
        }
    }),
    on(changeAdminUserSuccess, (state) => {
        return {
            ...state,
            loading: false,
            updated: true
        }
    }),
    on(changeAdminUserFail, (state) => {
        return {
            ...state,
            loading: false,
            updated: false
        }
    }),
    on(changeActiveUser, (state) => {
        return {
            ...state,
            loading: true,
            updated: false
        }
    }),
    on(changeActiveUserSuccess, (state) => {
        return {
            ...state,
            loading: false,
            updated: true
        }
    }),
    on(changeActiveUserFail, (state) => {
        return {
            ...state,
            loading: false,
            updated: false
        }
    })
)