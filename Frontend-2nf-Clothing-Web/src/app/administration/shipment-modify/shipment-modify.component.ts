import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { Observable } from 'rxjs';
import { ShipmentRequest } from '../../models/sales/shipment-request';
import { selectShipmentResponse } from '../../store/selectors/shipments.selector';
import { loadShipmentById, modifyShipment } from '../../store/actions/shipment.actions';

@Component({
  selector: 'app-shipment-modify',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './shipment-modify.component.html',
  styleUrl: './shipment-modify.component.css'
})
export class ShipmentModifyComponent implements OnInit{
  formShipment: FormGroup = new FormGroup({});
  shipment$: Observable<ShipmentRequest | null> = new Observable<ShipmentRequest>();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.store.dispatch(loadShipmentById({id: this.activatedRoute.snapshot.params['id']}));
    this.shipment$ = this.store.select(selectShipmentResponse);
    this.shipment$.subscribe(shipment => {
      this.formShipment = this.fb.group({
        floor: [shipment?.floor],
        appartement : [shipment?.appartement],
        street: [shipment?.street, [Validators.required]],
        streetNumber: [shipment?.streetNumber, [Validators.required, Validators.min(1)]],
        state: [shipment?.state, [Validators.required]],
        city: [shipment?.city, [Validators.required]],
        postalCode: [shipment?.postalCode, [Validators.required]],
        details: [shipment?.details]
    })
    })
  }

  submit(){
    if(this.formShipment.valid){
      var shipment = this.formShipment.value as ShipmentRequest
      this.store.dispatch(modifyShipment({shipment, id: this.activatedRoute.snapshot.params['id']}));
      this.store.dispatch(loadShipmentById({id: this.activatedRoute.snapshot.params['id']}));
    }
  }


}
