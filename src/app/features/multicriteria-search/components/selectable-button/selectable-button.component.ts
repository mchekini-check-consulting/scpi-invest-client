import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-selectable-button',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './selectable-button.component.html',
  styleUrl: './selectable-button.component.css'
})
export class SelectableButtonComponent {
  @Input() icon: string = '';
  @Input() image?: string=undefined;
  @Input() text: string = '';
  @Output() selected = new EventEmitter<string>();

  isSelected: boolean = false;


  toggleSelection(): void {
    this.isSelected = !this.isSelected;
    this.selected.emit(this.text);
  }

  clearSelection(): void {
    this.isSelected = false;
  }
}
