import { Injectable } from "@angular/core";
import { ArticleService } from "../../services/article.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS } from "../actions/article.actions";
import { EMPTY, catchError, map, mergeMap } from "rxjs";

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
}