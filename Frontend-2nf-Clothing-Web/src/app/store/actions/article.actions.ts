import { createAction, props } from "@ngrx/store";
import { Article } from "../../models/article";

// savings
export const ADD_ARTICLE = '[new-article] Add Article';
export const ADD_ARTICLE_SUCCESS = '[new-article] Add Article Success';
export const ADD_ARTICLE_FAIL = '[new-article] Add Article Fail';
// gettings
export const LOAD_ARTICLES = '[Home] Load Articles';
export const LOAD_ARTICLES_SUCCESS = '[Home] Load Articles Success';
export const LOAD_ARTICLES_FAIL = '[Home] Load Articles Fail';
// deleting
export const DELETE_ARTICLE = '[articles-list] Delete Article';
export const DELETE_ARTICLE_SUCCESS = '[articles-list] Delete Article Success';
export const DELETE_ARTICLE_FAIL = '[articles-list] Delete Article Fail';
// updating
export const UPDATE_ARTICLE = '[update-article] Update Article';
export const UPDATE_ARTICLE_SUCCESS = '[update-article] Update Article Success';
export const UPDATE_ARTICLE_FAIL = '[update-article] Update Article Fail';

export const loadArticles = createAction(
    LOAD_ARTICLES
);
export const loadArticlesSuccess = createAction(
    LOAD_ARTICLES_SUCCESS, 
    props<{ articles: Article[] }>()
);
export const loadArticlesFail = createAction(
    LOAD_ARTICLES_FAIL
);
export const addArticle = createAction(
    ADD_ARTICLE,
    props<{ article: Article }>()
);
export const addArticleSuccess = createAction(
    ADD_ARTICLE_SUCCESS
)
export const addArticleFail = createAction(
    ADD_ARTICLE_FAIL
)