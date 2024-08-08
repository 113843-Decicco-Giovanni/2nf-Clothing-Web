import { Component, OnInit } from '@angular/core';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { loadSales } from '../../store/actions/sale.actions';
import { Client } from '../../models/clients/client';
import { selectClient } from '../../store/selectors/clients.selector';
import { selectSales } from '../../store/selectors/sale.selector';

@Component({
  selector: 'app-my-shopping',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './my-shopping.component.html',
  styleUrl: './my-shopping.component.css'
})
export class MyShoppingComponent implements OnInit {
  sales$: Observable<SaleResponse[]> = new Observable<SaleResponse[]>();
  client$: Observable<Client> = new Observable<Client>();

  constructor(
    private store : Store<AppState>,
    private router : Router
  ){}

  ngOnInit(): void {
    this.client$ = this.store.select(selectClient);
    this.sales$ = this.store.select(selectSales);
    this.client$.pipe(take(1)).subscribe(client => {
      this.store.dispatch(loadSales({clientDoc: client.docId, fechaFin: new Date(), fechaInicio: new Date()}));
    })
  }

  calcularTotal(sale: SaleResponse) {
    return sale.details.reduce((acc, prod) => acc + prod.unitPrice * prod.amount, 0)
  }

  viewDetails(sale: SaleResponse){
    this.router.navigate(['/my-shopping', sale.id]);
  }
}