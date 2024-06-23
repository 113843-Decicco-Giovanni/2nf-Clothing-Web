import { Component, OnInit } from '@angular/core';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { loadSaleById } from '../../store/actions/sale.actions';
import { selectSale } from '../../store/selectors/sale.selector';
import { SaleDetailResponse } from '../../models/sales/responses/sale-detail-response';

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
}
