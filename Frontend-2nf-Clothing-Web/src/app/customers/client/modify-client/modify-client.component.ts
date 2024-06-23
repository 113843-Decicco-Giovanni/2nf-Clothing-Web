import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ClientRequest } from '../../../models/clients/clientRequest';
import { selectClient, selectClientUpdated } from '../../../store/selectors/clients.selector';
import Swal from 'sweetalert2';
import { updateClient } from '../../../store/actions/client.actions';
import { Observable } from 'rxjs';
import { Client } from '../../../models/clients/client';

@Component({
  selector: 'app-modify-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modify-client.component.html',
  styleUrl: './modify-client.component.css'
})
export class ModifyClientComponent implements OnInit{
  formCliente: FormGroup = new FormGroup({});
  clientId: number = 0;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ){
  }
  ngOnInit() {
    this.store.select(selectClient).subscribe(client => {
      this.formCliente = this.fb.group({
        name: [client.name, [Validators.required]],
        secondName: [client.secondName],
        surname: [client.surname, [Validators.required]],
        secondSurname: [client.secondSurname],
        docId: [client.docId, [Validators.required]],
        street: [client.street, [Validators.required]],
        streetNumber: [client.streetNumber, [Validators.required, Validators.min(1)]],
        state: [client.state, [Validators.required]],
        city: [client.city, [Validators.required]],
        country: [client.country, [Validators.required]],
        postalCode: [client.postalCode, [Validators.required]],
        phone: [client.phone, [Validators.required]],
        email: [client.user.email, [Validators.required, Validators.email]],
        userName: [client.user.userName, [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.minLength(8)]],
        confirmNewPassword: ['', [Validators.minLength(8)]]
      })
      //this.formCliente.patchValue(client);
      this.clientId = client.id;
    })
  }

  submit(){
    if(this.formCliente.valid){{
        var client = this.formCliente.value as ClientRequest;
        this.store.dispatch(updateClient({id: this.clientId, client}));
        this.store.select(selectClientUpdated).subscribe((updated) => {
          if(updated){
            Swal.fire({
              icon: 'success',
              title: '¡Datos actualizados!',
              color: '#a7a7a7',
              background: '#262626',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/home']);
            })
        }});
      }
    }
  }
}
