import { Devolution } from "../../models/devolutions/devolution";

export interface DevolutionState{
    devolutions: Devolution[],
    devolution: Devolution | null,
    loading: boolean,
    added: boolean,
    deleted: boolean
}