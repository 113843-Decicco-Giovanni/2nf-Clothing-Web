import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-client-home',
  templateUrl: './customers-home.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  styleUrls: ['./customers-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
