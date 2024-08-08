import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/articles/article';
import { Observable, async, map, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { CommonModule } from '@angular/common';
import { Size } from '../../models/stocks/size';
import { Stock } from '../../models/stocks/stock';
import { FormsModule } from '@angular/forms';
import { loadArticleById, loadSizes } from '../../store/actions/article.actions';
import { selectArticle, selectSizes } from '../../store/selectors/articles.selector';
import { addToCart } from '../../store/actions/cart.actions';
import { CartDetail } from '../../models/cart/cartDetail';
import { selectCart, selectCartAmount } from '../../store/selectors/cart.selector';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit, OnDestroy {

  article$: Observable<Article> = new Observable();
  sizes$: Observable<ReadonlyArray<Size>> = new Observable();
  talleSeleccionado: Size = {
    id: 0,
    description: ''
  };
  amount: number = 1;
  disponibles: number = 0;
  suscriptions: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
  }
  ngOnDestroy() {
    this.suscriptions.forEach(x => x.unsubscribe());
  }

  ngOnInit() {
    this.store.dispatch(loadSizes());
    this.store.dispatch(loadArticleById({ id: this.activatedRoute.snapshot.params['id'] }));
    this.sizes$ = this.store.select(selectSizes);
    this.article$ = this.store.select(selectArticle);
  }

  hayTalle(id: number): Observable<boolean> {
    return this.article$.pipe(
      map(article => {
        return article.stocks.some(x => x.size == id);
      })
    );
    // this.article$.pipe(take(1)).subscribe(article => {
    //   return article.stocks?.some(x => x.size == id);
    // })
    // return new Observable(() => { false });
  }

  estaDescontinuado(): Observable<boolean> {
    return this.article$.pipe(
      map(article => {
        return article.discontinuedAt != null;
      })
    );
  }

  seleccionarTalle(size: Size) {
    this.talleSeleccionado = size;
    this.actualizarDisponibles();
  }

  actualizarDisponibles() {
    this.article$.subscribe(article => {
      var stock = article.stocks.find(x => x.size == this.talleSeleccionado.id);
      if (stock != undefined) {
        this.disponibles = stock ? stock.amount : 0;
        console.log('Disponibles: ' + this.disponibles);
        console.log('Talle: ' + this.talleSeleccionado.id);
        console.log('Amount: ' + this.amount);
      }
    });
  }

  addToCart() {
    if (this.talleSeleccionado.id != 0 && this.amount != 0 && this.amount <= this.disponibles) {
      var article: Article;
      this.suscriptions.push(this.store.select(selectCartAmount).pipe(take(1)).subscribe(
        cart => {
          var id = cart + 1
            this.suscriptions.push(this.article$.pipe(take(1)).subscribe(x => {
              article = x
              const cartDetail: CartDetail = {
                id: id,
                article: article,
                size: this.talleSeleccionado,
                amount: this.amount
              }
              this.store.dispatch(addToCart({ detail: cartDetail }));
              Swal.fire({
                icon: 'success',
                title: 'Artículo agregado al carrito',
                showConfirmButton: false,
                timer: 1500,
                background: '#262626',
                color: '#a7a7a7'
              }).then( () => {
                this.router.navigate(['cart']);
              })
            }))
        }
      ))
    }
  }
}
