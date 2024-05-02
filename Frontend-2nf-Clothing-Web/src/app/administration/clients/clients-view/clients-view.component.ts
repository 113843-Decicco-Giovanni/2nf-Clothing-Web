import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../../../models/clients/client';
import { selectClients } from '../../../store/selectors/clients.selector';
import { loadClients } from '../../../store/actions/client.actions';

@Component({
  selector: 'app-clients-view',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './clients-view.component.html',
  styleUrl: './clients-view.component.css'
})
export class ClientsViewComponent implements OnInit{
  clients$: Observable<ReadonlyArray<Client>> = new Observable();

  constructor(
    private store: Store<AppState>,
    private router: Router
  ){}
  ngOnInit() {
    this.store.dispatch(loadClients());
    this.clients$ = this.store.select(selectClients);
  }
}
