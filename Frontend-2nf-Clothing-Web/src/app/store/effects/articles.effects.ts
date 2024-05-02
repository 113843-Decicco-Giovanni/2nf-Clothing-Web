import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ACTIVATE_ARTICLE_SUCCESS, ADD_ARTICLE_SUCCESS, DELETE_ARTICLE_SUCCESS, LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_WITH_STOCK, LOAD_ARTICLE_BY_ID, LOAD_ARTICLE_BY_ID_SUCCESS, LOAD_ARTICLE_TYPES, LOAD_ARTICLE_TYPES_SUCCESS, UPDATE_ARTICLE_SUCCESS, activateArticle, addArticle, deleteArticle, loadArticleById, updateArticle, updateStock } from "../actions/article.actions";
import { EMPTY, catchError, map, mergeMap } from "rxjs";
import { ArticleService } from "../../services/article.service";

@Injectable()
export class ArticlesEffects{
    constructor(
        private actions$: Actions,
        private service: ArticleService
    ){}

    loadArticles$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLES),
        mergeMap(() => this.service.getArticles()
            .pipe(
                map(articles => ({type: LOAD_ARTICLES_SUCCESS, articles})),
                catchError(() => EMPTY)
                )
            )
        )
    );
    loadArticlesWithStock$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLES_WITH_STOCK),
        mergeMap(() => this.service.getArticlesWithStock()
            .pipe(
                map(articles => ({type: LOAD_ARTICLES_SUCCESS, articles})),
                catchError(() => EMPTY)
                )
            )
        )
    );

    loadArticleTypes$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_ARTICLE_TYPES),
        mergeMap(() => this.service.getArticleTypes()
            .pipe(
                map(articleTypes => ({type: LOAD_ARTICLE_TYPES_SUCCESS, articleTypes})),
                catchError(() => EMPTY)
            )
    )))

    addArticle$ = createEffect(() => this.actions$.pipe(
        ofType(addArticle),
        mergeMap((action) => this.service.addArticle(action.article)
            .pipe(
                map(article => ({type: ADD_ARTICLE_SUCCESS, article})),
                catchError(() => EMPTY)
            )
        )
    ))

    deleteArticle$ = createEffect(() => this.actions$.pipe(
        ofType(deleteArticle),
        mergeMap((action) => this.service.deleteArticle(action.id)
            .pipe(
                map(() => ({type: DELETE_ARTICLE_SUCCESS})),
                catchError(() => EMPTY)
            )
        )
    ))
    activateArticle$ = createEffect(() => this.actions$.pipe(
        ofType(activateArticle),
        mergeMap((action) => this.service.activateArticle(action.id)
            .pipe(
                map(() => ({type: ACTIVATE_ARTICLE_SUCCESS})),
                catchError(() => EMPTY)
            )
        )
    ))
    updateArticle$ = createEffect(() => this.actions$.pipe(
        ofType(updateArticle),
        mergeMap((action) => this.service.updateArticle(action.article)
            .pipe(
                map(article => ({type: UPDATE_ARTICLE_SUCCESS, article})),
                catchError(() => EMPTY)
            )
        )
    ))
    loadArticleById$ = createEffect(() => this.actions$.pipe(
        ofType(loadArticleById),
        mergeMap((action) => this.service.getArticleById(action.id)
            .pipe(
                map(article => ({type: LOAD_ARTICLE_BY_ID_SUCCESS, article})),
                catchError(() => EMPTY)
            )
        )
    ))
    updateStock$ = createEffect(() => this.actions$.pipe(
        ofType(updateStock),
        mergeMap((action) => this.service.updateStock(action.articleId, action.stock)
            .pipe(
                map(() => ({type: UPDATE_ARTICLE_SUCCESS})),
                catchError(() => EMPTY)
            )
        )
    ))
}