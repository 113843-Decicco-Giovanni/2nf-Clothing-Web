import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AppState } from '../../store/states/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser, selectUserLogged } from '../../store/selectors/user.selector';
import { User } from '../../models/users/user';
import { Router, RouterLink } from '@angular/router';
import { logoutUser } from '../../store/actions/user.actions';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SideNavComponent } from "../../customers/side-nav/side-nav.component";

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SidePanelComponent, SideNavComponent],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export default class AdminHeaderComponent implements OnInit{
  isSideNavOpen = false;
  isSmall: boolean;

  openSideNav() {
    this.isSideNavOpen = true;
  }

  isSmallScreen(): boolean{
    return this.isSmall;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.isSmall = event.target.innerWidth < 1300;
  }

  loggedIn$: Observable<Boolean> = new Observable();
  loggedUser$: Observable<Readonly<User>> = new Observable();
  constructor(
    private store: Store<AppState>,
    private router: Router
    ){
      this.isSmall = window.innerWidth < 1300;
    }

    navigate(route: string): void {
      this.router.navigate([route]);
    }

  ngOnInit(){
    this.loggedIn$ = this.store.select(selectUserLogged);
    this.loggedUser$ = this.store.select(selectUser);
  }

  logout(){
    this.store.dispatch(logoutUser());
    this.router.navigate(['administration']);
    this.isSideNavOpen = false;
  }
}
