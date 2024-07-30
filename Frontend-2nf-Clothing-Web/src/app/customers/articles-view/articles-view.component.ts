import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Article } from '../../models/articles/article';
import { AppState } from '../../store/states/app.state';
import { selectArticleTypes, selectArticles, selectArticlesLoading, selectArticlesWithStock } from '../../store/selectors/articles.selector';
import { CommonModule } from '@angular/common';
import {  loadArticleTypes, loadArticlesWithStock } from '../../store/actions/article.actions';
import { FormsModule } from '@angular/forms';
import { ArticleType } from '../../models/articles/article-type';

@Component({
  selector: 'app-articles-view',
  templateUrl: './articles-view.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./articles-view.component.css'] // Corrige a `styleUrls` en lugar de `styleUrl`
})
export class ArticlesViewComponent {
  loading$: Observable<boolean>;
  articles$: Observable<ReadonlyArray<Article> | null>;
  articles: Article[] = [];
  articleTypes$: Observable<ReadonlyArray<ArticleType>>;
  search: string = '';
  constructor(private store: Store<AppState>, private router: Router) {
    // Inicializa los observables
    this.loading$ = this.store.select(selectArticlesLoading);
    this.articles$ = this.store.select(selectArticlesWithStock);
    this.articleTypes$ = this.store.select(selectArticleTypes);
  }

  ngOnInit() {
    this.store.dispatch(loadArticleTypes());
    this.store.dispatch(loadArticlesWithStock());
    this.cargarLista();
  }

  cargarLista(){
    this.store.select(selectArticlesWithStock).pipe(take(1)).subscribe(articles => {
      if (articles) {
        this.articles = [...articles];
      }
    })
  }

  openArticle(article: Article) {
    this.router.navigate(['article', article.id]);
  }

  onSearch(): void {
    const search = this.search.trim() !== '' ? this.search : undefined;

    if(search != undefined) this.articles = this.articles.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    else this.cargarLista();
  }
}
