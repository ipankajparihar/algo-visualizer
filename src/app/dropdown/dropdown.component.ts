import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select Algo';
  @Output() selected = new EventEmitter<string>();

  isOpen = false;
  selectedOption: string | null = null;

  selectOption(option: string) {
    this.selectedOption = option;
    this.selected.emit(option);
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-dropdown')) {
      this.isOpen = false;
    }
  }
}
