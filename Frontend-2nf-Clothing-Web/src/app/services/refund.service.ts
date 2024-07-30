import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Refund } from '../models/refunds/refund';
import { RefundRequest } from '../models/refunds/refund.request';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  url = "http://localhost:5260/api/refunds"

  constructor(private http: HttpClient) { }

  getRefunds(state?: number, clientDoc?: number, fechaInicio?: Date, fechaFin?: Date): Observable<Refund[]> {
    var url = this.url;

    url += `?state=${state}`;
    if (clientDoc) url += `&clientDoc=${clientDoc}`;
    if (fechaInicio) url += `&fechaInicio=${fechaInicio}`;
    if (fechaFin) url += `&fechaFin=${fechaFin}`;

    return this.http.get<Refund[]>(url);
  }

  createRefund(refund: RefundRequest): Observable<Refund> {
    return this.http.post<Refund>(this.url, refund);
  }
}
