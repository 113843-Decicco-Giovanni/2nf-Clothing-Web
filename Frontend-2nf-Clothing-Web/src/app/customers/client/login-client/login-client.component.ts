import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { loginClient } from '../../../store/actions/client.actions';
import { selectClientLogged } from '../../../store/selectors/clients.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-client.component.html',
  styleUrl: './login-client.component.css'
})
export class LoginClientComponent {
  formLogin: FormGroup = new FormGroup({});
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
   }

  login(){
    if(this.formLogin.valid){
      const { email, password } = this.formLogin.value;
      this.store.dispatch(loginClient({ email, password }));
      this.store.select(selectClientLogged).subscribe((logged) => {
        if(logged){
          Swal.fire({
            icon: 'success',
            title: '¡Bienvenido de nuevo!',
            color: '#a7a7a7',
            background: '#262626',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/home']);
          })
        }
      })
    }
  }
  register(){
    this.router.navigate(['/register']);
  }
}
