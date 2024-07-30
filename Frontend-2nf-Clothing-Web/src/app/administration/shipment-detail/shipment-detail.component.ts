import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipmentResponse } from '../../models/sales/responses/shipment-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectShipmentLoading, selectShipmentResponse } from '../../store/selectors/shipments.selector';
import { CommonModule } from '@angular/common';
import { cancelShipment, loadShipmentById, processShipment } from '../../store/actions/shipment.actions';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shipment-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './shipment-detail.component.html',
  styleUrl: './shipment-detail.component.css'
})
export class ShipmentDetailComponent implements OnInit{
  shipment$: Observable<ShipmentResponse | null> = new Observable<ShipmentResponse>();
  service: string = '';
  trackingId: number = 0;
  editable: boolean = false;

  
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadShipmentById({ id: this.activatedRoute.snapshot.params['id'] }));
    this.shipment$ = this.store.select(selectShipmentResponse);
    this.shipment$.subscribe(shipment => {
      this.service = shipment?.service ?? '';
      this.trackingId = shipment?.trackingId ?? 0;
      if (shipment?.shipmentState == 'Pendiente') this.editable = true
      if (shipment?.shipmentState == 'Pendiente Devolucion') this.editable = false
    })
  }

  procesar(){
    if(this.service != '' && this.trackingId != 0)
      this.store.dispatch(processShipment({ shipmentId: this.activatedRoute.snapshot.params['id'], service: this.service, trackingId: this.trackingId }));
    this.shipment$.subscribe(service => {
      if(service?.shipmentState == 'Procesado') this.editable = false
    })
  }

  modificarEnvio(){
    this.router.navigate(['administration', 'shipments', 'modify', this.activatedRoute.snapshot.params['id']]);
  }

  cancelarEnvio(){
    Swal.fire({
      title: '¿Desea cancelar el envío?',
      showCancelButton: true,
      confirmButtonColor: '#006912',
      background: '#262626',
      color: '#a7a7a7',
      cancelButtonColor: '#4a4a4a',
      confirmButtonText: 'Si, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(cancelShipment({ id: this.activatedRoute.snapshot.params['id'] }));
        this.store.select(selectShipmentLoading).subscribe(loading => {
          if(!loading) this.store.dispatch(loadShipmentById({ id: this.activatedRoute.snapshot.params['id'] }));
          this.shipment$.subscribe(shipment => {
            if(shipment?.shipmentState == 'Cancelado') this.editable = false
          })
        })
      }
    })
  }
}
