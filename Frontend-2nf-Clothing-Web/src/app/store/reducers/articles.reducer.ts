import { createReducer, on } from "@ngrx/store";
import { ArticlesState } from "../states/articles.state";
import { activateArticle, activateArticleFail, activateArticleSuccess, addArticle, addArticleSuccess, deleteArticle, deleteArticleFail, deleteArticleSuccess, loadArticleById, loadArticleByIdFail, loadArticleByIdSuccess, loadArticleTypes, loadArticleTypesSuccess, loadArticles, loadArticlesFail, loadArticlesSuccess, loadArticlesWithStock, updateArticle, updateArticleFail, updateArticleSuccess, updateStock, updateStockFail, updateStockSuccess } from "../actions/article.actions";

export const initialState: ArticlesState = {
    loading: false,
    articles: [],
    article: null,
    added: false,
    deleted: false,
    updated: false,
    articleTypes: []
}

export const articlesReducer = createReducer(
    initialState,

    on(loadArticles, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadArticlesWithStock, (state) => {
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
    }),

    on(loadArticleTypes, (state) => {
        return {
            ...state
        }
    }),
    on(loadArticleTypesSuccess, (state, { articleTypes }) => {
        return {
            ...state,
            articleTypes
        }
    }),
    on(loadArticlesFail, (state) =>{
        return {
            ...state
        }
    }),
    on(addArticle, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(addArticleSuccess, (state) => {
        return {
            ...state,
            loading: false,
            added: true
        }
    }),
    on(deleteArticle, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(deleteArticleSuccess, (state) => {
        return {
            ...state,
            loading: false,
            deleted: true
        }
    }),
    on(deleteArticleFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(updateArticle, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(updateArticleSuccess, (state) => {
        return {
            ...state,
            loading: false,
            updated: true
        }
    }),
    on(updateArticleFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(activateArticle, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(activateArticleSuccess, (state) => {
        return {
            ...state,
            loading: false,
            updated: true
        }
    }),
    on(activateArticleFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(loadArticleById, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadArticleByIdSuccess, (state, { article }) => {
        return {
            ...state,
            loading: false,
            article
        }
    }),
    on(loadArticleByIdFail, (state) => {
        return {
            ...state,
            loading: false
        }
    }),
    on(updateStock, (state) => {
        return {
            ...state,
            loading: true,
            updated: false
        }
    }),
    on(updateStockSuccess, (state) => {
        return {
            ...state,
            loading: false,
            updated: true
        }
    }),
    on(updateStockFail, (state) => {
        return {
            ...state,
            loading: false
        }
    })
)