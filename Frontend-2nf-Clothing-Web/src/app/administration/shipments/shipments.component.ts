import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShipmentResponse } from '../../models/sales/responses/shipment-response';
import { Observable } from 'rxjs';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectShipment, selectShipments } from '../../store/selectors/shipments.selector';
import { loadShipments } from '../../store/actions/shipment.actions';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.css'
})
export class ShipmentsComponent implements OnInit{
  shipments$: Observable<ShipmentResponse[]> = new Observable<ShipmentResponse[]>();
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  cliente: string = '';
  estado: number = 0;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shipments$ = this.store.select(selectShipments);
    this.store.dispatch(loadShipments({
      estado: this.estado
    }));
  }

  consultarEnvios(){
    this.store.dispatch(loadShipments({
      estado: this.estado,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
      clientDoc: parseInt(this.cliente)
    }))
  }

  viewDetails(shipment: ShipmentResponse){
    this.router.navigate(['administration/shipments', shipment.id]);
  }
}
