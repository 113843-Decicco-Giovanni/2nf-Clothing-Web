import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { SaleDetailResponse } from '../../models/sales/responses/sale-detail-response';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { loadSaleById } from '../../store/actions/sale.actions';
import { selectSale } from '../../store/selectors/sale.selector';
import { AppState } from '../../store/states/app.state';
import { ShipmentResponse } from '../../models/sales/responses/shipment-response';
import { loadShipmentBySaleId } from '../../store/actions/shipment.actions';
import { selectShipmentResponse } from '../../store/selectors/shipments.selector';
import { createDevolution } from '../../store/actions/devolution.actions';
import Swal from 'sweetalert2';
import { DevolutionRequest } from '../../models/devolutions/devolution.request';

@Component({
  selector: 'app-my-shopping-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './my-shopping-detail.component.html',
  styleUrl: './my-shopping-detail.component.css'
})
export class MyShoppingDetailComponent {
  sale$: Observable<SaleResponse | null> = new Observable<SaleResponse>();
  shipment$: Observable<ShipmentResponse | null> = new Observable<ShipmentResponse>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute  
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadSaleById({id: this.activatedRoute.snapshot.params['id']}));
    this.store.dispatch(loadShipmentBySaleId({saleId: this.activatedRoute.snapshot.params['id']}));
    this.shipment$ = this.store.select(selectShipmentResponse);
    this.sale$ = this.store.select(selectSale);
  }
  calcularTotal(sale: SaleResponse | null) {
    if(sale != null)
      return sale.details.reduce((acc, prod) => acc + prod.unitPrice * prod.amount, 0);
    return 0;
  }
  calcularSubtotal(item: SaleDetailResponse){
    return item.amount * item.unitPrice
  }

  devolucion(){
    var text;
    this.shipment$.pipe(take(1)).subscribe(shipment => {
        Swal.fire({
        title: '¿Desea realizar la devolución?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        icon: 'warning',
        background: '#262626',
        input: 'text',
        inputLabel: 'Motivo de la devolución',
        inputPlaceholder: 'Escriba el motivo de la devolución',
        color: '#a7a7a7',
        inputValidator: (value) => {
          if (!value) {
            return 'Debe escribir el motivo de la devolución';
          }
          text = value
          return
        }
      }).then((result) => {
        if (result.isConfirmed) {
          var devolution: DevolutionRequest = {
            shipmentId: shipment?.id as number,
            reason: result.value as string
          }
          this.store.dispatch(createDevolution({devolution}));
          this.store.dispatch(loadShipmentBySaleId({saleId: this.activatedRoute.snapshot.params['id']}));
        }
      })
    }) 
  }

  cancelarCompra(){
    
  }

  seProcesoElEnvio() : Observable<boolean>{
    return this.shipment$.pipe(
      take(1),
      map(shipment => shipment?.shipmentState == 'Procesado')
    );
  }

  sePuedeDevolver(): Observable<boolean>{
    return this.sale$.pipe(
      take(1),
      map(sale => {
        if (sale?.date) {
          const fechaCompra = new Date(sale.date);
          const fechaActual = new Date();
          const diferenciaDias = (fechaActual.getTime() - fechaCompra.getTime()) / (1000 * 60 * 60 * 24);
          return diferenciaDias <= 15;
        }
        return false;
      }));
  }
}
