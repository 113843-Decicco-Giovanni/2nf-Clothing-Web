import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Devolution } from '../models/devolutions/devolution';
import { Observable } from 'rxjs';
import { DevolutionRequest } from '../models/devolutions/devolution.request';

@Injectable({
  providedIn: 'root'
})
export class DevolutionService {

  url = "http://localhost:5260/api/devolution";

  constructor(private http: HttpClient) { }

  getDevolutions(state?: number, dni?: number, fechaInicio?: Date, fechaFin?: Date): Observable<Devolution[]> {
    var url = this.url;

    if (state) url += `?state=${state}`;
    if (dni) url += `&dni=${dni}`;
    if (fechaInicio) url += `&fechaInicio=${fechaInicio}`;
    if (fechaFin) url += `&fechaFin=${fechaFin}`;

    return this.http.get<Devolution[]>(url);
  }

  createDevolution(devolution: DevolutionRequest): Observable<Devolution> {
    return this.http.post<Devolution>(this.url, devolution);
  }

  updateDevolutionState(id: number, state: number, detail: string): Observable<Devolution> {
    return this.http.put<Devolution>(this.url + '/' + id + '?state=' + state + '&detail=' + detail, {});
  }

  getDevolutionById(id: number): Observable<Devolution> {
    return this.http.get<Devolution>(this.url + '/' + id);
  }

  getDevolutionByShipmentId(id: number): Observable<Devolution> {
    return this.http.get<Devolution>(this.url + '/shipment/' + id);
  }
}
