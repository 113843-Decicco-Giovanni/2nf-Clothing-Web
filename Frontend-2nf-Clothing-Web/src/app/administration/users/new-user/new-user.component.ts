import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { selectUser, selectUserAdded } from '../../../store/selectors/user.selector';
import { addUser } from '../../../store/actions/user.actions';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  formNewUser: FormGroup = new FormGroup({});
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  )
  {}
  ngOnInit(){
    this.formNewUser = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  submit(){
    if(this.formNewUser.valid){
      Swal.fire({
        title: '¿Desea crear el usuario?',
        showCancelButton: true,
        confirmButtonColor: '#006912',
        background: '#262626',
        color: '#a7a7a7',
        cancelButtonColor: '#4a4a4a',
        confirmButtonText: 'Si, crear!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.select(selectUser).subscribe(user => {
            const { userName, email, password } = this.formNewUser.value
          this.store.dispatch(addUser({ adminId: user.id,  userName, email, password }));
          this.store.select(selectUserAdded).subscribe(added => {
            if (added) {
              Swal.fire({
                title: 'Usuario creado',
                icon: 'success',
                background: '#262626',
                color: '#a7a7a7',
                confirmButtonColor: '#4a4a4a',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.router.navigate(['administration', 'users'])
              })
            }
          })
          })
        }
      })
    }
  }
}
