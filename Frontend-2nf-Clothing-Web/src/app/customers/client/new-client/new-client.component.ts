import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ClientRequest } from '../../../models/clients/clientRequest';
import { createClient } from '../../../store/actions/client.actions';
import { selectClientAdded } from '../../../store/selectors/clients.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.css'
})
export class NewClientComponent{
  
  formCliente: FormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ){
    this.formCliente = this.fb.group({
      name: ['', [Validators.required]],
      secondName: [''],
      surname: ['', [Validators.required]],
      secondSurname: [''],
      docId: ['', [Validators.required]],
      street: ['', [Validators.required]],
      streetNumber: ['', [Validators.required, Validators.min(1)]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  submit(){
    if(this.formCliente.valid){
      if(this.formCliente.get('password')?.value == this.formCliente.get('confirmPassword')?.value){
        var client = this.formCliente.value as ClientRequest;
        this.store.dispatch(createClient({client}));
        this.store.select(selectClientAdded).subscribe((added) => {
          if(added){
            Swal.fire({
              icon: 'success',
              title: '¡Cuenta creada exitosamente!',
              color: '#a7a7a7',
              background: '#262626',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/home']);
            })
        }});
      } else{
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
          color: '#a7a7a7',
          background: '#262626',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
}
