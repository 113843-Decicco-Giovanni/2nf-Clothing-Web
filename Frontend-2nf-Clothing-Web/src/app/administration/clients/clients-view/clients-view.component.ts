import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Client } from '../../../models/clients/client';
import { selectClients } from '../../../store/selectors/clients.selector';
import { loadClients } from '../../../store/actions/client.actions';

@Component({
  selector: 'app-clients-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './clients-view.component.html',
  styleUrl: './clients-view.component.css'
})
export class ClientsViewComponent implements OnInit{
  clients$: Observable<ReadonlyArray<Client>> = new Observable();
  name: string = '';
  docId: number = 0;

  constructor(
    private store: Store<AppState>
  ){}
  ngOnInit() {
    // this.store.dispatch(loadClients());
    this.clients$ = this.store.select(selectClients);
  }

  procesar(){
    this.store.dispatch(loadClients({ name: this.name, docId: this.docId }));
  }
}
