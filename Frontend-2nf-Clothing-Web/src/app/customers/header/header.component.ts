import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule
  ],
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  urlMinimal = 'assets/imagenes/logoMinimal.png';
  urlFull = 'assets/imagenes/logoCompleto.png';

  isSmall: boolean;

  constructor(){
    this.isSmall = window.innerWidth < 1300;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    this.isSmall = event.target.innerWidth < 1300;
  }

  isSmallScreen(): boolean{
    return this.isSmall;
  }
}
