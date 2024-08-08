import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-sales-by-day',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './sales-by-day.component.html',
  styleUrl: './sales-by-day.component.css'
})
export class SalesByDayComponent {
  fechaDesde: Date = new Date();
  fechaHasta: Date = new Date();
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
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          stepSize: 1
        }
      },
      y: {
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  constructor(
    private service: ReportsService
  ){}

  ngOnInit(): void {
    
  }

  procesar(){
    this.service.getSalesByDay(this.fechaDesde, this.fechaHasta).subscribe(res => {
      this.ventasPorMesData.labels = res.map(x => x.day + '/' + x.month + '/' + x.year);
      this.ventasPorMesData.datasets[0].data = res.map(x => x.amount);
      this.chart?.update();
    })
  }

  exportar(){
    var chart = document.getElementById('myChart') as HTMLCanvasElement;
    const urlBase64jp = chart.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = urlBase64jp;
    link.download = 'myChart.jpeg';
    link.click();
  }
}
