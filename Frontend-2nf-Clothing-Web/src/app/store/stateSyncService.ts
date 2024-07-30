// src/app/store/state-sync.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, saveState } from './states/app.state';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateSyncService {
  private stateChanges$ = new BehaviorSubject<AppState | null>(null);
  
  constructor(private store: Store<AppState>) {
    this.store.subscribe((state) => {
      this.stateChanges$.next(state);
    });

    this.stateChanges$.pipe(
      debounceTime(1000) // Espera 1 segundo antes de guardar
    ).subscribe((state) => {
      if (state) {
        saveState(state);
      }
    });
  }
}