import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { ArticlesState } from "../states/articles.state";

export const selectArticlesFeature = (state: AppState) => state.articles;

export const selectArticles = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.articles
)
export const selectArticlesLoading = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.loading
)
export const selectArticleAdded = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.added
)
export const selectArticleDeleted = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.deleted
)
export const selectArticleTypes = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.articleTypes
)
export const selectArticleUpdated = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.updated
)
export const selectArticle = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.article
)
export const selectSizes = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.sizes
)
export const selectArticlesWithStock = createSelector(
    selectArticlesFeature,
    (state: ArticlesState) => state.articlesWithStock
)