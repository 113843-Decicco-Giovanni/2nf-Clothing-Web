import { Injectable } from '@angular/core';
import { CartDetail } from '../models/cart/cartDetail';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { selectCart } from '../store/selectors/cart.selector';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private store: Store<AppState>
  ) { }

  addToCart(cart: CartDetail[],detail: CartDetail): CartDetail[] {
    var result = [...cart];
    if(cart.some(c => (c.article.id == detail.article.id) && (c.size.id == detail.size.id))){
      Swal.fire({
        icon: 'warning',
        title: 'Ya existe el articulo en tu carrito, se actualizará la cantidad',
        showConfirmButton: false,
        timer: 1500,
        background: '#262626',
        color: '#a7a7a7'
      })
      var detailToUpdate = cart.find(c => (c.article.id == detail.article.id) && (c.size.id == detail.size.id));
      if(detailToUpdate){
        var newDetail = {...detailToUpdate, amount: detailToUpdate.amount + detail.amount};
        result = result.filter(c => (c.article.id != detail.article.id) || (c.size.id != detail.size.id));
        result.push(newDetail);
      }
    }
    else{
      result.push(detail);
    }
    return result;
  }
  removeFromCart(cart: CartDetail[], detailId: number): CartDetail[] {
    console.log('remover de carrito');
    var result = [...cart];
    result = result.filter(c => c.id != detailId);
    return result;
  }
}
