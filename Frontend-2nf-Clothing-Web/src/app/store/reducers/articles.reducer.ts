import { createReducer, on } from "@ngrx/store";
import { ArticlesState } from "../states/articles.state";
import { loadArticles, loadArticlesFail, loadArticlesSuccess } from "../actions/article.actions";

export const initialState: ArticlesState = {
    loading: false,
    articles: [],
    added: false,
    deleted: false
}

export const articlesReducer = createReducer(
    initialState,

    on(loadArticles, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadArticlesSuccess, (state, { articles }) => {
        return {
            ...state,
            loading: false,
            articles
        }
    }),
    on(loadArticlesFail, (state) =>{
        return {
            ...state,
            loading: false
        }
    })
)