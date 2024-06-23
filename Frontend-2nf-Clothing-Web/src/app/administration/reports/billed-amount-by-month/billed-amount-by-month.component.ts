import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-billed-amount-by-month',
  standalone: true,
  imports: [CommonModule,
    BaseChartDirective,
    FormsModule],
  templateUrl: './billed-amount-by-month.component.html',
  styleUrl: './billed-amount-by-month.component.css'
})
export class BilledAmountByMonthComponent {
  fechaDesde: Date = new Date();
  fechaHasta: Date = new Date();
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];

  public ventasPorMesData: ChartConfiguration<'bar'>['data'] = {
    labels: [  ],
    datasets: [
      { data: [  ], label: 'Monto Facturado' }
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
    this.service.getBilledAmountByMonth(this.fechaDesde, this.fechaHasta).subscribe(res => {
      this.ventasPorMesData.labels = res.map(x => x.month + '/' + x.year);
      this.ventasPorMesData.datasets[0].data = res.map(x => x.amount);
      this.chart?.update();
    })
  }
}
