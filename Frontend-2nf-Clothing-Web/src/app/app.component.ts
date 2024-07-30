import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StateSyncService } from './store/stateSyncService';
import { AppState } from './store/states/app.state';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend-2nf-Clothing-Web';

  constructor(private service: StateSyncService, private store: Store<AppState>){
  }
}
