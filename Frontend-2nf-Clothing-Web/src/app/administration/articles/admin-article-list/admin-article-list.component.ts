import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../../../models/articles/article';
import { activateArticle, deleteArticle, loadArticles } from '../../../store/actions/article.actions';
import { selectArticleDeleted, selectArticleUpdated, selectArticles } from '../../../store/selectors/articles.selector';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-article-list.component.html',
  styleUrl: './admin-article-list.component.css'
})
export class AdminArticleListComponent implements OnInit {
  articles$ : Observable<ReadonlyArray<Article>> = new Observable();
  constructor(
    private store: Store<AppState>,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.store.dispatch(loadArticles());
    this.articles$ = this.store.select(selectArticles);
  }
  editArticle(article: Article) {
    this.router.navigate(['administration', 'articles', article.id]);
  }
  deleteArticle(article: Article) {
    Swal.fire({
      title: '¿Desea eliminar el articulo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#960000',
      confirmButtonText: 'Eliminar',
      background: '#262626',
      color: '#a7a7a7',
      cancelButtonColor: '#4a4a4a',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteArticle({id: article.id}));
        this.store.select(selectArticleDeleted).subscribe(deleted => {
          if (deleted) {
            Swal.fire({
              title: 'Artículo eliminado',
              icon: 'success',
              background: '#262626',
              color: '#a7a7a7',
              confirmButtonColor: '#4a4a4a',
              confirmButtonText: 'Ok',
            });
            this.store.dispatch(loadArticles());
          }
        })
      }
    })
  }
  activateArticle(article: Article) {
    Swal.fire({
      title: '¿Desea reactivar el articulo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#960000',
      confirmButtonText: 'Activar',
      background: '#262626',
      color: '#a7a7a7',
      cancelButtonColor: '#4a4a4a',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(activateArticle({id: article.id}));
        this.store.select(selectArticleUpdated).subscribe(updated => {
          if (updated) {
            Swal.fire({
              title: 'Artículo activado',
              icon: 'success',
              background: '#262626',
              color: '#a7a7a7',
              confirmButtonColor: '#4a4a4a',
              confirmButtonText: 'Ok',
            });
            this.store.dispatch(loadArticles());
          }
        })
      }
    })
  }
  addArticle(){
    this.router.navigate(['administration', 'articles', 'new']);
  }
}
