import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VentasDiaReportResponse, VentasMesReportResponse } from '../models/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  url = 'http://localhost:5260/api/reports/';

  constructor(private http: HttpClient) { }

  getSalesByMonth(mesDesde: Date, mesHasta: Date): Observable<VentasMesReportResponse[]>{
    return this.http.get<VentasMesReportResponse[]>(this.url + 'salesByMonth?mesDesde=' + mesDesde + '&mesHasta=' + mesHasta);
  }
  getSalesByDay(mesDesde: Date, mesHasta: Date): Observable<VentasDiaReportResponse[]>{
    return this.http.get<VentasDiaReportResponse[]>(this.url + 'salesByDay?fechaDesde=' + mesDesde + '&fechaHasta=' + mesHasta);
  }
  getBilledAmountByDay(mesDesde: Date, mesHasta: Date): Observable<VentasDiaReportResponse[]>{
    return this.http.get<VentasDiaReportResponse[]>(this.url + 'montoFacturadoDia?fechaDesde=' + mesDesde + '&fechaHasta=' + mesHasta);
  }
  getBilledAmountByMonth(mesDesde: Date, mesHasta: Date): Observable<VentasDiaReportResponse[]>{
    return this.http.get<VentasDiaReportResponse[]>(this.url + 'montoFacturadoMes?fechaDesde=' + mesDesde + '&fechaHasta=' + mesHasta);
  }
}
