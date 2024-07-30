import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input() isOpen: boolean = false;
  @Output() closeNavOutput = new EventEmitter();

  closeNav() {
    this.isOpen = false;
    this.closeNavOutput.emit();
  }
}
