import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/users/user';
import { selectUser, selectUserAdded, selectUserUpdated } from '../../../store/selectors/user.selector';
import { updateUser } from '../../../store/actions/user.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  formUpdate: FormGroup = new FormGroup({});
  user$: Observable<Readonly<User>> = new Observable();
  userId: number = 0;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ){
    
    this.formUpdate = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: [''],
    })
  }
  ngOnInit() {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe(user => {
      this.userId = user.id
      this.formUpdate = this.fb.group({
        userName: [user.userName, [Validators.required, Validators.minLength(4)]],
        email: [user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: [''],
      })
    })
  }

  submit(){
    if(this.formUpdate.valid){
      const { userName, email, password, newPassword } = this.formUpdate.value
        this.store.dispatch(updateUser({ userId: this.userId, userName, email, password, newPassword }));
        this.store.select(selectUserUpdated).subscribe(updated => {
          if (updated) {
            Swal.fire({
              title: 'Usuario actualizado',
              icon: 'success',
              background: '#262626',
              color: '#a7a7a7',
              confirmButtonColor: '#4a4a4a',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.router.navigate(['administration', 'users'])
            })
          }
        })
    }
  }
}
