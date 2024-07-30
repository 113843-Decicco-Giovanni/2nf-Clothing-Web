import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Devolution } from '../../models/devolutions/devolution';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleResponse } from '../../models/sales/responses/sale-response';
import { Router } from '@angular/router';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { getDevolutions } from '../../store/actions/devolution.actions';
import { selectDevolutions } from '../../store/selectors/devolution.selector';

@Component({
  selector: 'app-devolutions-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './devolutions-list.component.html',
  styleUrl: './devolutions-list.component.css'
})
export class DevolutionsListComponent implements OnInit{
  sale$: Observable<SaleResponse> = new Observable<SaleResponse>();
  devolutions$: Observable<Devolution[]> = new Observable<Devolution[]>();
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  state: number = 0;
  cliente: string = '';

  constructor(private router: Router, private store: Store<AppState>){}

  consultarDevoluciones(){
    var dni = 0;
    if(this.cliente != ''){
      dni = parseInt(this.cliente);
    }
    this.store.dispatch(getDevolutions({fechaInicio: this.fechaInicio, fechaFin: this.fechaFin, dni, state: this.state}));
  }

  viewDetails(devolution: Devolution){
    this.router.navigate(['administration/devolutions', devolution.id]);      
  }

  ngOnInit(): void {
    this.store.dispatch(getDevolutions({fechaInicio: undefined, fechaFin: undefined, dni: undefined, state: 0}));
    this.devolutions$ = this.store.select(selectDevolutions);
  }
}
