import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectClient } from '../../store/selectors/clients.selector';
import { Observable, map, take, takeLast } from 'rxjs';
import { CartDetail } from '../../models/cart/cartDetail';
import { selectCart } from '../../store/selectors/cart.selector';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { MP_PUBLIC_KEY } from '../../models/shared';
import { PreferenceResponse } from '../../models/sales/preference-response';
import { ItemPreference } from '../../models/sales/ItemPreference';
import { HttpClient } from '@angular/common/http';
import { Shipment } from '../../models/sales/shipment';
import { confirmShipment } from '../../store/actions/shipment.actions';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  formDireccion: FormGroup = new FormGroup({});
  cart$: Observable<CartDetail[]> = new Observable<CartDetail[]>
  total$: Observable<number> = new Observable<number>();

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>, 
    private router: Router,
    private client: HttpClient){

    }
  
  ngOnInit(): void {
    this.store.select(selectClient).pipe(take(1)).subscribe(client => {
      this.formDireccion = this.fb.group({
        floor: [''],
        appartement : [''],
        street: [client.street, [Validators.required]],
        streetNumber: [client.streetNumber, [Validators.required, Validators.min(1)]],
        state: [client.state, [Validators.required]],
        city: [client.city, [Validators.required]],
        country: [client.country, [Validators.required]],
        postalCode: [client.postalCode, [Validators.required]],
        phone: [client.phone, [Validators.required]],
        email: [client.user.email, [Validators.required, Validators.email]],
        details: ['']
      })
    })
    this.cart$ = this.store.select(selectCart);
    this.calcularTotal();
  }
  
  calcularTotal () {
    this.total$ = this.cart$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + curr.amount * curr.article.price, 0))
    )
  }

  submit(){
    if(this.formDireccion.valid){
      this.formDireccion.disable();
      var request = this.formDireccion.value as Shipment;
      this.store.dispatch(confirmShipment({shipment: request}));
      this.router.navigate(['/payment']);
    }
  }

  
}
