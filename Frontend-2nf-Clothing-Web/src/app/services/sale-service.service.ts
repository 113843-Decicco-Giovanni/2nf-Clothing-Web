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
    var fechaInicioFormateada = fechaInicio.toISOString();
    var fechaFinFormateada = fechaFin.toISOString();
    if (clientDoc == 0)
      return this.http.get<SaleResponse[]>(`http://localhost:5260/api/sale?fechaInicio=${fechaInicioFormateada}&fechaFin=${fechaFinFormateada}`)
    else
      return this.http.get<SaleResponse[]>(`http://localhost:5260/api/sale?fechaInicio=${fechaInicioFormateada}&fechaFin=${fechaFinFormateada}&clientDoc=${clientDoc}`)
  }
  getById(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`http://localhost:5260/api/sale/${id}`)
  }

  getByPaymentId(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`http://localhost:5260/api/sale/payment/${id}`)
  }

  putPendingRefund(id: number): Observable<any> {
    return this.http.put(`http://localhost:5260/api/sale/refund/${id}`, {})
  }
}
