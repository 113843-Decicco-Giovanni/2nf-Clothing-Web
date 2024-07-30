import { createAction, props } from "@ngrx/store";
import { Article } from "../../models/articles/article";
import { ArticleType } from "../../models/articles/article-type";
import { Size } from "../../models/stocks/size";

// savings
export const ADD_ARTICLE = '[new-article] Add Article';
export const ADD_ARTICLE_SUCCESS = '[new-article] Add Article Success';
export const ADD_ARTICLE_FAIL = '[new-article] Add Article Fail';
// gettings
export const LOAD_ARTICLES_WITH_STOCK = '[Home] Load Articles With Stock';
export const LOAD_ARTICLES_WITH_STOCK_SUCCESS = '[Home] Load Articles With Stock Success';
export const LOAD_ARTICLES_WITH_STOCK_FAIL = '[Home] Load Articles With Stock Fail';

export const LOAD_ARTICLES = '[Adim-Article-List] Load Articles';
export const LOAD_ARTICLES_SUCCESS = '[Home] Load Articles Success';
export const LOAD_ARTICLES_FAIL = '[Home] Load Articles Fail';
// deleting
export const DELETE_ARTICLE = '[articles-list] Delete Article';
export const DELETE_ARTICLE_SUCCESS = '[articles-list] Delete Article Success';
export const DELETE_ARTICLE_FAIL = '[articles-list] Delete Article Fail';
// activate
export const ACTIVATE_ARTICLE = '[articles-list] Activate Article';
export const ACTIVATE_ARTICLE_SUCCESS = '[articles-list] Activate Article Success';
export const ACTIVATE_ARTICLE_FAIL = '[articles-list] Activate Article Fail';
// updating
export const UPDATE_ARTICLE = '[update-article] Update Article';
export const UPDATE_ARTICLE_SUCCESS = '[update-article] Update Article Success';
export const UPDATE_ARTICLE_FAIL = '[update-article] Update Article Fail';

//articletypes
export const LOAD_ARTICLE_TYPES = '[admin-new-article] Load Article Types';
export const LOAD_ARTICLE_TYPES_SUCCESS = '[admin-new-article] Load Article Types Success';
export const LOAD_ARTICLE_TYPES_FAIL = '[admin-new-article] Load Article Types Fail';

//articleById
export const LOAD_ARTICLE_BY_ID = '[article] Load Article By Id';
export const LOAD_ARTICLE_BY_ID_SUCCESS = '[article] Load Article By Id Success';
export const LOAD_ARTICLE_BY_ID_FAIL = '[article] Load Article By Id Fail';

//stock
export const UPDATE_STOCK = '[stock] Update Stock';
export const UPDATE_STOCK_SUCCESS = '[stock] Update Stock Success';
export const UPDATE_STOCK_FAIL = '[stock] Update Stock Fail';

//sizes
export const LOAD_SIZES = '[Articles] Load Sizes';
export const LOAD_SIZES_SUCCESS = '[Articles] Load Sizes Success';
export const LOAD_SIZES_FAIL = '[Articles] Load Sizes Fail';

export const loadArticles = createAction(
    LOAD_ARTICLES
);
export const loadArticlesWithStock = createAction(
    LOAD_ARTICLES_WITH_STOCK
)
export const loadArticlesWithStockSuccess = createAction(
    LOAD_ARTICLES_WITH_STOCK_SUCCESS,
    props<{ articles: Article[] }>()
)
export const loadArticlesWithStockFail = createAction(
    LOAD_ARTICLES_WITH_STOCK_FAIL
)
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
export const updateArticle = createAction(
    UPDATE_ARTICLE,
    props<{ id: number, article: Article }>()
)
export const updateArticleSuccess = createAction(
    UPDATE_ARTICLE_SUCCESS
)
export const updateArticleFail = createAction(
    UPDATE_ARTICLE_FAIL
)

export const loadArticleTypes = createAction(
    LOAD_ARTICLE_TYPES
)
export const loadArticleTypesSuccess = createAction(
    LOAD_ARTICLE_TYPES_SUCCESS,
    props<{ articleTypes: ArticleType[] }>()
)
export const loadArticleTypesFail = createAction(
    LOAD_ARTICLE_TYPES_FAIL
)
export const deleteArticle = createAction(
    DELETE_ARTICLE,
    props<{ id: number }>()
)
export const deleteArticleSuccess = createAction(
    DELETE_ARTICLE_SUCCESS
)
export const deleteArticleFail = createAction(
    DELETE_ARTICLE_FAIL
)
export const activateArticle = createAction(
    ACTIVATE_ARTICLE,
    props<{ id: number }>()
)
export const activateArticleSuccess = createAction(
    ACTIVATE_ARTICLE_SUCCESS
)
export const activateArticleFail = createAction(
    ACTIVATE_ARTICLE_FAIL
)

export const loadArticleById = createAction(
    LOAD_ARTICLE_BY_ID,
    props<{ id: number }>()
)
export const loadArticleByIdSuccess = createAction(
    LOAD_ARTICLE_BY_ID_SUCCESS,
    props<{ article: Article }>()
)
export const loadArticleByIdFail = createAction(
    LOAD_ARTICLE_BY_ID_FAIL
)
export const updateStock = createAction(
    UPDATE_STOCK,
    props<{ articleId: number, stock: { size: number, amount: number } }>()
)
export const updateStockSuccess = createAction(
    UPDATE_STOCK_SUCCESS
)
export const updateStockFail = createAction(
    UPDATE_STOCK_FAIL
)
export const loadSizes = createAction(
    LOAD_SIZES
)
export const loadSizesSuccess = createAction(
    LOAD_SIZES_SUCCESS,
    props<{ sizes: Size[] }>()
)
export const loadSizesFail = createAction(
    LOAD_SIZES_FAIL
)

// export const filterArticles = createAction(
//     FILTER_ARTICLES,
//     props<{ name?: string, articleType?: number, orderBy?: number }>()
// )
// export const filterArticlesSuccess = createAction(
//     FILTER_ARTICLES_SUCCESS,
//     props<{ filteredArticles: Article[] }>()
// )