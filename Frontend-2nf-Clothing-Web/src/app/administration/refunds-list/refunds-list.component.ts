import { Component, OnInit } from '@angular/core';
import { Refund } from '../../models/refunds/refund';
import { selectRefunds } from '../../store/selectors/refund.selector';
import { Observable } from 'rxjs';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { getRefunds } from '../../store/actions/refund.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refunds-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './refunds-list.component.html',
  styleUrl: './refunds-list.component.css'
})
export class RefundsListComponent implements OnInit{
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  state: number = 0;
  cliente: string = '';
  
  refunds$: Observable<Refund[]> = new Observable<Refund[]>();

  constructor(
    private store: Store<AppState>,
    private router: Router
    ){}

  ngOnInit(): void {
    this.store.dispatch(getRefunds({fechaInicio: undefined, fechaFin: undefined, clientDoc: undefined, state: 0}));
    this.refunds$ = this.store.select(selectRefunds);
  }

  consultarReembolsos(){
    var dni = 0;
    if(this.cliente != ''){
      dni = parseInt(this.cliente);
    }
    if(this.fechaInicio.toDateString() == this.fechaFin.toDateString())
      this.store.dispatch(getRefunds({fechaInicio: undefined, fechaFin: undefined, clientDoc: dni, state: this.state}));
    else 
      this.store.dispatch(getRefunds({fechaInicio: this.fechaInicio, fechaFin: this.fechaFin, clientDoc: dni, state: this.state}));
  }

  // addRefund(){
  //   this.router.navigate(['administration', 'refunds', 'new']);
  // }
}
