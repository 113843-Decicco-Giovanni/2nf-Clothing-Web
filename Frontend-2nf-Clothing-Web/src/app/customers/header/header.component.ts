import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/users/user';
import { selectClient, selectClientLogged } from '../../store/selectors/clients.selector';
import { logoutClient } from '../../store/actions/client.actions';
import Swal from 'sweetalert2';
import { CartDetail } from '../../models/cart/cartDetail';
import { selectCart, selectCartAmount } from '../../store/selectors/cart.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  urlMinimal = 'assets/imagenes/logoMinimal.png';
  urlFull = 'assets/imagenes/logoCompleto.png';

  isSmall: boolean;
  userLogged$: Observable<Readonly<User>> = new Observable();
  loggedIn$: Observable<Boolean> = new Observable();
  cart$: Observable<number> = new Observable();

  constructor(
    private store: Store<AppState>,
    private router: Router
    ){
    this.isSmall = window.innerWidth < 1300;
  }
  ngOnInit(){
    this.userLogged$ = this.store.select(selectClient);
    this.loggedIn$ = this.store.select(selectClientLogged);
    this.cart$ = this.store.select(selectCartAmount);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.isSmall = event.target.innerWidth < 1300;
  }

  isSmallScreen(): boolean{
    return this.isSmall;
  }

  login(){
    this.router.navigate(['/login']);
  }
  logout(){
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      showCancelButton: true,
      confirmButtonColor: '#006912',
      background: '#262626',
      color: '#a7a7a7',
      cancelButtonColor: '#4a4a4a',
      confirmButtonText: 'Si, cerrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(logoutClient());
        this.router.navigate(['/home']);
      }
    })
  }
  profile(){
    this.router.navigate(['/account']);
  }
  cart() {
    this.router.navigate(['cart']);
  }
  register(){
    this.router.navigate(['/register']);
  }

  misCompras(){
    this.router.navigate(['/my-shopping']);
  }
}
