import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-devolution',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './devolution.component.html',
  styleUrl: './devolution.component.css'
})
export class DevolutionComponent {
  formDevolucion: FormGroup = new FormGroup({});
}
