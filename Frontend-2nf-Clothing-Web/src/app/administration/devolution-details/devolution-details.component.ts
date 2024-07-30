import { Component, OnInit } from '@angular/core';
import { Shipment } from '../../models/sales/shipment';
import { ShipmentResponse } from '../../models/sales/responses/shipment-response';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Devolution } from '../../models/devolutions/devolution';
import { selectDevolution, selectDevolutionsLoading } from '../../store/selectors/devolution.selector';
import { getDevolutionById, updateDevolutionState } from '../../store/actions/devolution.actions';
import { ActivatedRoute } from '@angular/router';
import { loadSaleById } from '../../store/actions/sale.actions';
import { loadShipmentById } from '../../store/actions/shipment.actions';
import { selectShipment, selectShipmentResponse } from '../../store/selectors/shipments.selector';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devolution-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './devolution-details.component.html',
  styleUrl: './devolution-details.component.css'
})
export class DevolutionDetailsComponent implements OnInit{
  devolution$: Observable<Devolution> = new Observable<Devolution>();
  shipment$: Observable<ShipmentResponse | null> = new Observable<ShipmentResponse | null>();
  detail: string = '';
  state: number = 1;
  activado = true;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.store.dispatch(getDevolutionById({ id: this.activatedRoute.snapshot.params['id'] }));
    this.devolution$ = this.store.select(selectDevolution);
    this.store.select(selectDevolutionsLoading).subscribe(loading => {
      if (!loading) {
        this.devolution$.pipe(take(1)).subscribe(devolution => {
          var devolutionState = this.calcularEstado(devolution.state);
          if(devolutionState == 2 || devolutionState == 3) this.activado = false;
          this.state = devolutionState
          this.detail = devolution.detail;
          this.store.dispatch(loadShipmentById({ id: devolution.shipmentId }));
          this.shipment$ = this.store.select(selectShipmentResponse);
        })
      }
    })
  }

  calcularEstado(state: string){
    switch(state){
      case 'Pendiente': return 0;
      case 'En curso': return 1;
      case 'Finalizado': return 2;
      case 'Cancelado': return 3;
      default: return 0
    }
  }

  actualizarEstado(){
    if(this.state == 2){
      Swal.fire({
        title: '¿Desea finalizar la devolución?',
        text: 'Esto creará un reembolso y no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#960000',
        confirmButtonText: 'Cambiar',
        background: '#262626',
        color: '#a7a7a7',
        cancelButtonColor: '#4a4a4a',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(updateDevolutionState({ devolutionId: this.activatedRoute.snapshot.params['id'], state: this.state, detail: this.detail }));
        }
      })
    }else{
      this.store.dispatch(updateDevolutionState({ devolutionId: this.activatedRoute.snapshot.params['id'], state: this.state, detail: this.detail }));
    }
  }
}
