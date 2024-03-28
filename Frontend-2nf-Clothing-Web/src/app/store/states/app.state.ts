import { ActionReducerMap } from "@ngrx/store";
import { ArticlesState } from "./articles.state";
import { articlesReducer } from "../reducers/articles.reducer";

export interface AppState{
    articles: ArticlesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    articles: articlesReducer
}