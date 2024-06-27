import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleResponse } from '../models/sales/responses/sale-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {

  constructor(private http: HttpClient) { }

  getSales(fechaInicio: Date, fechaFin: Date, clientDoc: number): Observable<SaleResponse[]> {
    if (clientDoc == 0)
      return this.http.get<SaleResponse[]>(`http://localhost:5260/api/sale?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
    else
      return this.http.get<SaleResponse[]>(`http://localhost:5260/api/sale?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&clientDoc=${clientDoc}`)
  }
  getById(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`http://localhost:5260/api/sale/${id}`)
  }

  getByPaymentId(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`http://localhost:5260/api/sale/payment/${id}`)
  }
}
