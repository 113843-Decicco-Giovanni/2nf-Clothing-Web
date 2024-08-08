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
import { SaleServiceService } from '../../services/sale-service.service';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { clearCart } from '../../store/actions/cart.actions';

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
  sale$: Observable<SaleResponse> = new Observable<SaleResponse>();
  total$ : Observable<number> = new Observable<number>();

  constructor(
    private store: Store<AppState>, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: SaleServiceService) { }
  
  ngOnInit(): void {
    window.scroll(0, 0);

    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      var param = params['payment_id'];
      var paymentId = Number(param);
      this.store.dispatch(getPaymentStatus({ paymentId }));

      this.consultarStatus();
    })
  }

  calcularTotal () {
    this.total$ = this.sale$.pipe(
      map(sale => sale.details.reduce((acc, curr) => acc + curr.amount * curr.unitPrice, 0))
    )
  }

  consultarStatus(){
    console.log("consultarStatus")
    this.store.select(selectPaymentStatus).subscribe(status => {
      if (status.status == 'approved') {
        console.log(this.activatedRoute.snapshot.queryParams['payment_id'])
        this.status = 'approved';
        this.sale$ = this.service.getByPaymentId(this.activatedRoute.snapshot.queryParams['payment_id'])
        this.store.dispatch(clearCart());
        this.hasItems = true;
        this.calcularTotal();
      }
    })
  }
}
