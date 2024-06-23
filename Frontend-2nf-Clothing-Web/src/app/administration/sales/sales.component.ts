import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { loadSales } from '../../store/actions/sale.actions';
import { selectSales } from '../../store/selectors/sale.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{
  sales$: Observable<SaleResponse[]> = new Observable<SaleResponse[]>();
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  cliente: string = '';
  constructor(
    private store: Store<AppState>,
    private router: Router
  ){}
  ngOnInit(): void {
    // var fechaInicio = new Date();
    // var fechaFin = new Date();
    // fechaInicio.setHours(0);
    // this.fechaInicio = fechaInicio;
    // this.store.dispatch(loadSales({fechaInicio, fechaFin}));
    this.sales$ = this.store.select(selectSales);
  }

  viewDetails(sale: SaleResponse){
    this.router.navigate(['administration/sales', sale.id]);
  }

  consultarVentas(){
    var clientDoc = 0;
    if(this.cliente != ''){
      clientDoc = parseInt(this.cliente);
    }
    this.store.dispatch(loadSales({fechaInicio: this.fechaInicio, fechaFin: this.fechaFin, clientDoc}));
  }

  calcularTotal(sale: SaleResponse) {
    return sale.details.reduce((acc, prod) => acc + prod.unitPrice, 0)
  }
}
