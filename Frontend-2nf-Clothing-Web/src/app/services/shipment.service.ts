import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShipmentResponse } from '../models/sales/responses/shipment-response';
import { Observable } from 'rxjs';
import { ShipmentRequest } from '../models/sales/shipment-request';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private http: HttpClient) { }

  getShipments(estado: number, fechaInicio?: Date, fechaFin?: Date, clientDoc?: number): Observable<ShipmentResponse[]> {
    var url = `http://localhost:5260/api/shipments?estado=${estado}`
    if(fechaInicio && fechaFin){
      url += `&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    }
    if(clientDoc){
      url += `&clientDoc=${clientDoc}`
    }
    return this.http.get<ShipmentResponse[]>(url);
  }

  getShipmentById(id: number): Observable<ShipmentResponse> {
    return this.http.get<ShipmentResponse>(`http://localhost:5260/api/shipments/${id}`);
  }

  processShipment(shipmentId: number, service: string, trackingId: number) : Observable<ShipmentResponse> {
    return this.http.post<ShipmentResponse>(`http://localhost:5260/api/shipments/process/${shipmentId}?service=${service}&trackingId=${trackingId}`, {})
  }

  modifyShipment(id: number, shipment: ShipmentRequest): Observable<ShipmentResponse> {
    return this.http.put<ShipmentResponse>(`http://localhost:5260/api/shipments/${id}`, shipment)
  }

  getShipmentBySaleId(id: number): Observable<ShipmentResponse> {
    return this.http.get<ShipmentResponse>(`http://localhost:5260/api/shipments/sale/${id}`)
  }

  cancelShipment(id: number): Observable<ShipmentResponse> {
    return this.http.delete<ShipmentResponse>(`http://localhost:5260/api/shipments/${id}`)
  }
}
