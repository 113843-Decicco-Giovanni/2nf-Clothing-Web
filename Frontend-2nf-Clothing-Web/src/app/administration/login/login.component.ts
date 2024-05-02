import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { loginUser } from '../../store/actions/user.actions';
import { selectUserLogged } from '../../store/selectors/user.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  logged$: Observable<boolean> = new Observable()
  formLogin: FormGroup = new FormGroup({})
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formLogin = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.logged$ = this.store.select(selectUserLogged)
  }
  login() {
    if (this.formLogin.valid) {
      const { userName, password } = this.formLogin.value
      this.store.dispatch(loginUser({ userName, password }))
      this.logged$.subscribe(logged => {
        if (logged) {
          this.router.navigate(['administration', 'articles'])
        }
      })
    }
  }
}
