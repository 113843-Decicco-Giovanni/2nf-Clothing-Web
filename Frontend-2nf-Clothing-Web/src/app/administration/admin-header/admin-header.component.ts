import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser, selectUserLogged } from '../../store/selectors/user.selector';
import { User } from '../../models/users/user';
import { Router, RouterLink } from '@angular/router';
import { logoutUser } from '../../store/actions/user.actions';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule,
  RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export default class AdminHeaderComponent implements OnInit{
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
