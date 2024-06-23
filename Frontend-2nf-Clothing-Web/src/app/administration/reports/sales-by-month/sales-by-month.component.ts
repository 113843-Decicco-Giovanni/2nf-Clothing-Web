import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-sales-by-month',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './sales-by-month.component.html',
  styleUrl: './sales-by-month.component.css'
})
export class SalesByMonthComponent {
  mesHasta: Date = new Date();
  mesDesde: Date = new Date();
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];

  public ventasPorMesData: ChartConfiguration<'bar'>['data'] = {
    labels: [  ],
    datasets: [
      { data: [  ], label: 'Ventas' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private service: ReportsService
  ){}

  ngOnInit(): void {
    
  }

  procesar(){
    this.service.getSalesByMonth(this.mesDesde, this.mesHasta).subscribe(res => {
      this.ventasPorMesData.labels = res.map(x => x.month + '/' + x.year);
      this.ventasPorMesData.datasets[0].data = res.map(x => x.amount);
      this.chart?.update();
    })
  }
}
