import { User } from "../../models/users/user";

export interface UserState{
    loading: boolean;
    user: any;
    users: ReadonlyArray<User>;
    logged: boolean;
    added: boolean;
    deleted: boolean;
    updated: boolean;
}