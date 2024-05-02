import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/articles/article';
import { Observable, map} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { CommonModule } from '@angular/common';
import { Size } from '../../models/stocks/size';
import { Stock } from '../../models/stocks/stock';
import { FormsModule } from '@angular/forms';


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
export class ArticleComponent implements OnInit {

  article: Article = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    type: 0,
    images: [''],
    createdAt: new Date(),
    stocks: []
  };
  stocks$: Observable<ReadonlyArray<Stock>> = new Observable();
  sizes$: Observable<ReadonlyArray<Size>> = new Observable();
  talleSeleccionado: Size = {
    id: 0,
    description: ''
  }
  amount: number = 1;
  disponibles: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private store: Store<AppState>
    ) {

  }

  ngOnInit() {
    // //rehacer esta mierda
    // this.store.dispatch(loadSizes());
    // this.store.dispatch(loadStocks());
    // this.activatedRoute.params.subscribe(params => {
    //   const articleId = params['id'];
  
    //   // Cargar el artículo directamente si ya está disponible
    //   this.store.select(selectArticles).pipe(
    //     map(articles => articles.find(article => article.id === articleId))
    //   ).subscribe(article => {
    //     if (article) {
    //       this.article = article;
    //     } else {
    //       // Si el artículo no está disponible, cargarlo
    //       this.store.dispatch(loadArticleById({ id: articleId }));
    //       // Suscribirse al artículo después de cargarlo
    //       this.store.select(selectArticle).subscribe(article => {
    //         if (article) {
    //           this.article = article;
    //         }
    //       });
  
    //   // Cargar los stocks por el ID del artículo
    //   }})});
  
    // // Suscribirse a los stocks y tamaños después de cargarlos
    
    // this.stocks$ = this.store.select(selectStocks);
    // this.sizes$ = this.store.select(selectSizes);
  }

  hayTalle(id:number): Observable<boolean> {
    return this.stocks$.pipe(
      map(stocks => {
        return !stocks.some(x => x.size == id)
      })
    )
  }

  seleccionarTalle(size: Size) {
    this.talleSeleccionado = size;
    this.actualizarDisponibles();
  }

  actualizarDisponibles(){
    this.stocks$.subscribe(stocks => {
      var stock = stocks.find(x => x.size == this.talleSeleccionado.id);
      if(stock != undefined){
        this.disponibles = stock.amount;
      }
    })
  }

  addToCart() {
    
  }
}
