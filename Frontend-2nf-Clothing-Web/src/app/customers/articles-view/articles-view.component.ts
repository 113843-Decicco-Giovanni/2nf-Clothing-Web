import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Article } from '../../models/articles/article';
import { AppState } from '../../store/states/app.state';
import { selectArticles, selectArticlesLoading } from '../../store/selectors/articles.selector';
import { CommonModule } from '@angular/common';
import { loadArticles, loadArticlesWithStock } from '../../store/actions/article.actions';

@Component({
  selector: 'app-articles-view',
  templateUrl: './articles-view.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './articles-view.component.css'
})
export class ArticlesViewComponent {
  loading$: Observable<Boolean> = new Observable();
  articles$: Observable<ReadonlyArray<Article>> = new Observable();
  
  constructor(private store: Store<AppState>, private router: Router){}

  ngOnInit(){
    this.store.dispatch(loadArticlesWithStock());
    this.loading$ = this.store.select(selectArticlesLoading);
    this.articles$ = this.store.select(selectArticles);
  }

  openArticle(article: Article){
    this.router.navigate(['article', article.id]);
  }
}
