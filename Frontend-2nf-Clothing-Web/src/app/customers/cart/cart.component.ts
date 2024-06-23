import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { CartDetail } from '../../models/cart/cartDetail';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectCart, selectCartDeleted } from '../../store/selectors/cart.selector';
import { removeFromCart } from '../../store/actions/cart.actions';
import Swal from 'sweetalert2';
import { selectClientLogged } from '../../store/selectors/clients.selector';
import { Stock } from '../../models/stocks/stock';
import { ItemPreference } from '../../models/sales/ItemPreference';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart$: Observable<ReadonlyArray<CartDetail>> = new Observable()
  stocks$: Observable<ReadonlyArray<Stock>> = new Observable()
  total$: Observable<number> = new Observable()
  hasItems = true;

  mp: any;
  preferences: ItemPreference[] = [];

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.cart$ = this.store.select(selectCart);
    this.cart$.subscribe(cart => {
      if (cart.length == 0) {
        this.hasItems = false;
      }
    })
    this.calcularTotal();
    this.comprobarStock();
    this.store.select(selectClientLogged).subscribe(logged => {
      if (logged) {
        // this.loadMercadoPagoSDK();
      }
    })
  }

  calcularTotal () {
    this.total$ = this.cart$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + curr.amount * curr.article.price, 0))
    )
  }

  comprobarStock() {

  }
  deleteDetail(detailId: number) {
    Swal.fire({
      title: '¿Desea eliminar el artículo del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#960000',
      confirmButtonText: 'Eliminar',
      background: '#262626',
      color: '#a7a7a7',
      cancelButtonColor: '#4a4a4a',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(removeFromCart({ detailId }));
        this.store.select(selectCartDeleted).subscribe(deleted => {
          if (deleted) {
            Swal.fire({
              title: 'Artículo eliminado',
              icon: 'success',
              background: '#262626',
              color: '#a7a7a7'
            })
            this.cart$.subscribe(cart => {
              if (cart.length == 0) {
                this.router.navigate(['home']);
              }
            })
          }
        })
      }
    })
  }
  continueShopping() {
    this.store.select(selectClientLogged).subscribe(logged => {
      if (logged) {
        this.router.navigate(['checkout']);
      }
      else {
        this.router.navigate(['login']);
      }
    })
  }

  
}
