import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, forkJoin, map, take } from 'rxjs';
import { CartDetail } from '../../models/cart/cartDetail';
import { ItemPreference } from '../../models/sales/ItemPreference';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { selectCart } from '../../store/selectors/cart.selector';
import { Shipment } from '../../models/sales/shipment';
import { selectShipment } from '../../store/selectors/shipments.selector';
import { User } from '../../models/users/user';
import { Client } from '../../models/clients/client';
import { selectClient } from '../../store/selectors/clients.selector';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { PreferenceResponse } from '../../models/sales/preference-response';
import { MP_PUBLIC_KEY } from '../../models/shared';
import { PreferenceRequest } from '../../models/sales/preference-request';

@Component({
  selector: 'app-payment-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './payment-button.component.html',
  styleUrl: './payment-button.component.css'
})
export class PaymentButtonComponent implements OnInit {
  cart$: Observable<CartDetail[]> = new Observable<CartDetail[]>
  total$: Observable<number> = new Observable<number>();
  shimpment$: Observable<Shipment> = new Observable<Shipment>();
  client$: Observable<Client> = new Observable<Client>();
  mp: any;
  preferences: ItemPreference[] = [];
  botonCargado = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private client: HttpClient
  ) { }

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCart);
    this.shimpment$ = this.store.select(selectShipment);
    this.client$ = this.store.select(selectClient);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total$ = this.cart$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + curr.amount * curr.article.price, 0))
    )
  }

  confirm() {
    this.botonCargado = true;
    this.loadMercadoPagoSDK();

  }

  loadMercadoPagoSDK() {
    console.log("CargarMp")
    loadMercadoPago().then(mpInstance => {
      this.mp = mpInstance;
      if (this.mp) {
        this.mp = new this.mp(MP_PUBLIC_KEY);
        console.log('MercadoPago SDK loaded successfully');
        // Ahora puedes inicializar las preferencias de pago o cualquier otra configuración necesaria

        this.cart$.pipe(take(1)).subscribe(cart => {
          this.client$.pipe(take(1)).subscribe(client => {
            this.shimpment$.pipe(take(1)).subscribe(shipment => {
              console.log(shipment);
              console.log(cart);
              console.log(client);

              this.preferences = []; // Asegúrate de limpiar las preferencias antes de agregar nuevas
              cart.forEach(item => {
                this.preferences.push({ articleId: item.article.id, amount: item.amount, sizeId: item.size.id });
              });

              console.log(this.preferences);

              var preferenceRequest: PreferenceRequest = {
                clientId: client.id,
                floor: shipment.floor,
                appartement: shipment.appartement,
                street: shipment.street,
                streetNumber: shipment.streetNumber,
                city: shipment.city,
                state: shipment.state,
                postalCode: shipment.postalCode,
                email: shipment.email,
                phone: shipment.phone,
                shipmentDetails: shipment.details,
                details: this.preferences
              };

              console.log(preferenceRequest);

              let answer = this.client.post<PreferenceResponse>('http://localhost:5260/api/sale/preference', preferenceRequest,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${MP_PUBLIC_KEY}`
                  }
                });

              answer.pipe(take(1)).subscribe(async (preference) => {
                console.log('preference ID: ' + preference.id);

                const brickBuilder = this.mp.bricks();

                const generateButton = async () => {
                  if (window.checkoutButton) {
                    window.checkoutButton.unmount();
                  }
                  window.checkoutButton = await brickBuilder.create("wallet", "wallet-container", {
                    initialization: {
                      preferenceId: preference.id
                    }
                  });
                }
                await generateButton();
              });
            });
          });
        });

        // forkJoin([this.cart$, this.shimpment$, this.client$]).pipe(take(1)).subscribe(([cart, shipment, client]) => {

        //   console.log(shipment);
        //   console.log(cart);
        //   console.log(client);

        //   this.preferences = []; // Asegúrate de limpiar las preferencias antes de agregar nuevas
        //   cart.forEach(item => {
        //     this.preferences.push({ id: item.id, amount: item.amount });
        //   });

        //   var preferenceRequest: PreferenceRequest = {
        //     clientId: client.id,
        //     floor: shipment.floor,
        //     appartement: shipment.appartement,
        //     street: shipment.street,
        //     streetNumber: shipment.streetNumber,
        //     city: shipment.city,
        //     state: shipment.state,
        //     postalCode: shipment.postalCode,
        //     email: shipment.email,
        //     phone: shipment.phone,
        //     shipmentDetails: shipment.details,
        //     details: this.preferences
        //   };

        //   console.log(preferenceRequest);

        //   let answer = this.client.post<PreferenceResponse>('http://localhost:5260/api/sale/preference', preferenceRequest,
        //     {
        //       headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${MP_PUBLIC_KEY}`
        //       }
        //     });

        //   answer.pipe(take(1)).subscribe(async (preference) => {
        //     console.log('preference ID: ' + preference.id);

        //     const brickBuilder = this.mp.bricks();

        //     const generateButton = async () => {
        //       if (window.checkoutButton) {
        //         window.checkoutButton.unmount();
        //       }
        //       window.checkoutButton = await brickBuilder.create("wallet", "wallet-container", {
        //         initialization: {
        //           preferenceId: preference.id
        //         }
        //       });
        //     }
        //     await generateButton();
        //   });
        // }); 
      } else {
        console.error('MercadoPago SDK could not be loaded');
      }
    }).catch(error => {
      console.error('Error loading MercadoPago SDK', error);
    });
  }
}