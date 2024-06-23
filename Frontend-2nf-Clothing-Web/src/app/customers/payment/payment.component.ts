import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { selectPaymentStatus } from '../../store/selectors/payment.selector';
import { Observable, map, take } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getPaymentStatus } from '../../store/actions/payment.actions';
import { CartDetail } from '../../models/cart/cartDetail';
import { selectCart } from '../../store/selectors/cart.selector';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  status: string = 'pending';
  hasItems: boolean = false;
  cart$ : Observable<CartDetail[]> = new Observable<CartDetail[]>();
  total$ : Observable<number> = new Observable<number>();

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.calcularTotal();

    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      var param = params['payment_id'];
      var paymentId = Number(param);
      this.store.dispatch(getPaymentStatus({ paymentId }));

      this.consultarStatus();
    })
  }

  calcularTotal () {
    this.total$ = this.cart$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + curr.amount * curr.article.price, 0))
    )
  }

  consultarStatus(){
    console.log("consultarStatus")
    this.store.select(selectPaymentStatus).subscribe(status => {
      if (status.status == 'approved') {
        this.status = 'approved';
      }
    })
  }
}
