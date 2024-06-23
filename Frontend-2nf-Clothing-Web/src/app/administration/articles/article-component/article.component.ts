import { Component, NgModule, OnInit } from '@angular/core';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { activateArticle, deleteArticle, loadArticleById, loadSizes, updateStock } from '../../../store/actions/article.actions';
import { selectArticle, selectArticleDeleted, selectArticleUpdated, selectArticlesLoading, selectSizes } from '../../../store/selectors/articles.selector';
import { Observable, filter, map, take } from 'rxjs';
import { Article } from '../../../models/articles/article';
import { CommonModule } from '@angular/common';
import { Size } from '../../../models/stocks/size';
import { Stock } from '../../../models/stocks/stock';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-by-article',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
    ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  article$: Observable<Article> = new Observable();
  sizes$: Observable<ReadonlyArray<Size>> = new Observable();
  formStock: FormGroup = new FormGroup({});
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ){}
  ngOnInit() {
    this.formStock = this.fb.group({
      size: [1, [Validators.required]],
      amount: ['', [Validators.required]],
    })
    this.store.dispatch(loadSizes());
    this.sizes$ = this.store.select(selectSizes);

    this.store.dispatch(loadArticleById( { id: this.activatedRoute.snapshot.params['id'] } ));
    this.article$ = this.store.select(selectArticle);
  }

  visualizarStock(size: Size): Observable<Stock> {
    return this.article$.pipe(
      take(1),
      map(article => {
        var stock = article.stocks.find(stock => stock.size == size.id)!
        if(stock != undefined){
          return stock
        }
        var stock: Stock = {
          id: 0,
          amount: 0,
          size: 0,
          article: 0,
          lastAmountAdded: 0,
          updatedAt: new Date()
        }
        return stock;
      })
    );
  }
  editArticle() {
    this.router.navigate(['administration', 'articles', 'modify', this.activatedRoute.snapshot.params['id']]);
  }

  addStock() {
    if(this.formStock.valid){
      var sizeId = this.formStock.get('size')?.value as number;
      var amount = this.formStock.get('amount')?.value as number;
      this.store.dispatch(updateStock({articleId: this.activatedRoute.snapshot.params['id'], stock: {size: sizeId, amount: amount}}));
    }
    this.store.select(selectArticlesLoading)
  .pipe(
    filter(loading => !loading),
    take(1) // Completa el observable después de recibir el primer `false`
  )
  .subscribe(() => {
    this.store.dispatch(loadArticleById({ id: this.activatedRoute.snapshot.params['id'] }));
  });
  }

  deleteArticle() {
    this.article$.pipe(take(1)).subscribe(article => {
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
              this.store.dispatch(loadArticleById( { id: this.activatedRoute.snapshot.params['id'] } ));
  
            }
          })
        }
      })
    })
  }
  activateArticle() {
    this.article$.pipe(take(1)).subscribe(article => {
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
              this.store.dispatch(loadArticleById( { id: this.activatedRoute.snapshot.params['id'] } ));
            }
          })
        }
      })
    })
  }
}
