import { createAction, props } from "@ngrx/store";
import { User } from "../../models/users/user";

export const ADD_USER = '[UsersAdmin] Add User';
export const ADD_USER_SUCCESS = '[UsersAdmin] Add User Success';
export const ADD_USER_FAIL = '[UsersAdmin] Add User Fail';

export const LOAD_USERS = '[UsersAdmin] Load Users';
export const LOAD_USERS_SUCCESS = '[UsersAdmin] Load User Success';
export const LOAD_USERS_FAIL = '[UsersAdming] Load User Fail';

export const DELETE_USER = '[UsersAdmin] Delete User';
export const DELETE_USER_SUCCESS = '[UsersAdmin] Delete User Success';
export const DELETE_USER_FAIL = '[UsersAdmin] Delete User Fail';

export const UPDATE_USER = '[UsersAdmin] Update User';
export const UPDATE_USER_SUCCESS = '[UsersAdmin] Update User Success';
export const UPDATE_USER_FAIL = '[UsersAdmin] Update User Fail';

export const LOGIN_USER = '[Login] Login User';
export const LOGIN_USER_SUCCESS = '[Login] Login User Success';
export const LOGIN_USER_FAIL = '[Login] Login User Fail';

export const LOGOUT_USER = '[Admin-home] Logout User';

export const CHANGE_ADMIN_USER = '[Users-List] Change Admin User';
export const CHANGE_ADMIN_USER_SUCCESS = '[Users-List] Change Admin User Success';
export const CHANGE_ADMIN_USER_FAIL = '[Users-List] Change Admin User Fail';

export const CHANGE_ACTIVE_USER = '[Users-List] Change Active User';
export const CHANGE_ACTIVE_USER_SUCCESS = '[Users-List] Change Active User Success';
export const CHANGE_ACTIVE_USER_FAIL = '[Users-List] Change Active User Fail';

export const loginUser = createAction(
    LOGIN_USER,
    props<{ userName: string, password: string }>()
)
export const loginUserSuccess = createAction(
    LOGIN_USER_SUCCESS,
    props<{ user: User }>()
)
export const loginUserFail = createAction(
    LOGIN_USER_FAIL
)

export const logoutUser = createAction(
    LOGOUT_USER
)
export const loadUsers = createAction(
    LOAD_USERS,
    props<{ adminId: number }>()
)
export const loadUsersSuccess = createAction(
    LOAD_USERS_SUCCESS,
    props<{ users: User[] }>()
)
export const loadUsersFail = createAction(
    LOAD_USERS_FAIL
)
export const addUser = createAction(
    ADD_USER,
    props<{ adminId: number, userName: string, email: string, password: string }>()
)
export const addUserSuccess = createAction(
    ADD_USER_SUCCESS
)
export const addUserFail = createAction(
    ADD_USER_FAIL
)
export const updateUser = createAction(
    UPDATE_USER,
    props<{ userId: number, userName: string, email: string, password: string, newPassword?: string }>()
)
export const updateUserSuccess = createAction(
    UPDATE_USER_SUCCESS,
    props<{ user: User }>()
)
export const updateUserFail = createAction(
    UPDATE_USER_FAIL
)
export const changeAdminUser = createAction(
    CHANGE_ADMIN_USER,
    props<{ adminId: number, userId: number }>()
)
export const changeAdminUserSuccess = createAction(
    CHANGE_ADMIN_USER_SUCCESS
)
export const changeAdminUserFail = createAction(
    CHANGE_ACTIVE_USER_FAIL
)

export const changeActiveUser = createAction(
    CHANGE_ACTIVE_USER,
    props<{ adminId: number, userId: number }>()
)
export const changeActiveUserSuccess = createAction(
    CHANGE_ACTIVE_USER_SUCCESS
)
export const changeActiveUserFail = createAction(
    CHANGE_ACTIVE_USER_FAIL
)
