import { Component, OnInit } from '@angular/core';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { loadSaleById, updatePendingRefund } from '../../store/actions/sale.actions';
import { selectSale, selectSalesLoading } from '../../store/selectors/sale.selector';
import { SaleDetailResponse } from '../../models/sales/responses/sale-detail-response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sale-detail',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sale-detail.component.html',
  styleUrl: './sale-detail.component.css'
})
export class SaleDetailComponent implements OnInit{
  sale$: Observable<SaleResponse | null> = new Observable<SaleResponse>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute  
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadSaleById({id: this.activatedRoute.snapshot.params['id']}));
    this.sale$ = this.store.select(selectSale);
  }
  calcularTotal(sale: SaleResponse | null) {
    if(sale != null)
      return sale.details.reduce((acc, prod) => acc + prod.unitPrice, 0);
    return 0;
  }
  calcularSubtotal(item: SaleDetailResponse){
    return item.amount * item.unitPrice
  }

  refundSale(){
    Swal.fire({
      title: '¿Desea reembolsar la venta?',
      icon: 'warning',
      showCancelButton: true,
      text: 'Esto cambiará el estado de la venta a reembolsada',
      confirmButtonColor: '#960000',
      confirmButtonText: 'Reembolsar',
      background: '#262626',
      color: '#a7a7a7',
      cancelButtonColor: '#4a4a4a',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(updatePendingRefund({id: this.activatedRoute.snapshot.params['id']}));
        this.store.select(selectSalesLoading).subscribe(loading => {
          if(!loading) this.store.dispatch(loadSaleById({id: this.activatedRoute.snapshot.params['id']}));
        })
      }
    })
  }
}
