import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user';
import { logoutUser } from '../../store/actions/user.actions';
import { selectUserLogged, selectUser } from '../../store/selectors/user.selector';
import { AppState } from '../../store/states/app.state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.css'
})
export class SidePanelComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() closeNavOutput = new EventEmitter();

  closeNav() {
    this.isOpen = false;
    this.closeNavOutput.emit();
  }

  loggedIn$: Observable<Boolean> = new Observable();
  loggedUser$: Observable<Readonly<User>> = new Observable();
  constructor(
    private store: Store<AppState>,
    private router: Router
    ){}

  ngOnInit(){
    this.loggedIn$ = this.store.select(selectUserLogged);
    this.loggedUser$ = this.store.select(selectUser);
  }

  logout(){
    this.store.dispatch(logoutUser());
    this.router.navigate(['administration']);
  }
}
