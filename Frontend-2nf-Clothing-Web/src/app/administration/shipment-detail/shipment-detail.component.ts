import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShipmentResponse } from '../../models/sales/responses/shipment-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectShipmentResponse } from '../../store/selectors/shipments.selector';
import { CommonModule } from '@angular/common';
import { loadArticleById } from '../../store/actions/article.actions';
import { loadShipmentById, processShipment } from '../../store/actions/shipment.actions';
import { FormsModule } from '@angular/forms';

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
}
