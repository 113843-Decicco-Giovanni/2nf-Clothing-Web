import { createReducer, on } from "@ngrx/store";
import { DevolutionState } from "../states/devolution.state";
import { createDevolution, createDevolutionFail, createDevolutionSuccess, getDevolutionById, getDevolutionByShipmentId, getDevolutionSuccess, getDevolutions, getDevolutionsFail, getDevolutionsSuccess, updateDevolutionState, updateDevolutionStateFail, updateDevolutionStateSuccess } from "../actions/devolution.actions";

export const initialState: DevolutionState = {
    devolutions: [],
    devolution: null,
    loading: false,
    added: false,
    deleted: false
}

export const devolutionReducer = createReducer(
    initialState,
    
    on(getDevolutions , (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getDevolutionsSuccess, (state, { devolutions }) => {
        return {
            ...state,
            loading: false,
            devolutions
        }
    }),
    on(getDevolutionsFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(createDevolution, (state) => {
        return {
            ...state,
            loading: true,
            added: false
        }
    }),
    on(createDevolutionSuccess, (state, { devolution }) => {
        return {
            ...state,
            loading: false,
            added: true,
            devolution
        }
    }),
    on(createDevolutionFail, (state) => {
        return {
            ...state,
            loading: false,
            added: false,
        }
    }),
    on(getDevolutionById, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getDevolutionByShipmentId, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(getDevolutionSuccess, (state, { devolution }) => {
        return {
            ...state,
            loading: false,
            devolution
        }
    }),
    on(updateDevolutionState, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(updateDevolutionStateSuccess, (state, { devolution }) => {
        return {
            ...state,
            loading: false,
            devolution
        }
    }),
    on(updateDevolutionStateFail, (state) => {
        return {
            ...state,
            loading: false
        }
    })
)