import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from '../../../models/users/user';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { changeActiveUser, changeAdminUser, loadUsers } from '../../../store/actions/user.actions';
import { selectUser, selectUserUpdated, selectUsers } from '../../../store/selectors/user.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  users$: Observable<ReadonlyArray<User>> = new Observable();
  user$: Observable<Readonly<User>> = new Observable();
  userId: number = 0;

  constructor(
    private store: Store<AppState>,
    private router: Router
  )
  {}
  ngOnInit(){
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(user => {
      this.store.dispatch(loadUsers({adminId: user.id}));
      this.userId = user.id
    })
    this.users$ = this.store.select(selectUsers);
  }
  newUser(){
    this.router.navigate(['administration/users/new']);
  }

  changeActivated(user: User){
    this.store.dispatch(changeActiveUser({adminId: this.userId, userId: user.id}));
    this.store.select(selectUserUpdated).subscribe(updated => {
      if (updated) {
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'Se cambio el estado del usuario',
          icon: 'success',
          background: '#262626',
          color: '#a7a7a7',
          confirmButtonColor: '#4a4a4a',
          confirmButtonText: 'Ok'
        })
        this.store.dispatch(loadUsers({adminId: this.userId}));
      }
    })
    this.store.dispatch(loadUsers({adminId: this.userId}));
  }
  changeAdmin(user: User){
    this.store.dispatch(changeAdminUser({adminId: this.userId, userId: user.id}));
    this.store.select(selectUserUpdated).subscribe(updated => {
      if (updated) {
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'Se cambiaron los permisos del usuario',
          icon: 'success',
          background: '#262626',
          color: '#a7a7a7',
          confirmButtonColor: '#4a4a4a',
          confirmButtonText: 'Ok'
        })
        this.store.dispatch(loadUsers({adminId: this.userId}));
      }
    })
    this.store.dispatch(loadUsers({adminId: this.userId}));
  }
}