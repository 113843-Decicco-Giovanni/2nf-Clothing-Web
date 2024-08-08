import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AdminHeaderComponent from '../admin-header/admin-header.component';
import { SidePanelComponent } from "../side-panel/side-panel.component";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminHeaderComponent,
    SidePanelComponent
],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
