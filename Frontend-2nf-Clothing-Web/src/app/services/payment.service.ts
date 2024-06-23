import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentStatus } from '../models/payment-status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = "http://localhost:5260/api/sale";

  constructor(private http: HttpClient) { }

  getPaymentStatus(id: number) : Observable<PaymentStatus>  {
    console.log(id)
    return this.http.get<PaymentStatus>(this.url + '/status/' + id);
  }
}
