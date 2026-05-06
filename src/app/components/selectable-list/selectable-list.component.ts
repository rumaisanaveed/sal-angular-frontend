import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-selectable-list',
  imports: [CommonModule],
  templateUrl: './selectable-list.component.html',
  styleUrl: './selectable-list.component.css',
})
export class SelectableListComponent<T extends Record<string, any>> {
  @Input() items: T[] = [];
  @Input() labelKey!: keyof T;
  @Input() subLabelKey?: keyof T;
  @Input() classes?: string = '';

  @Output() onSelect = new EventEmitter<T>();

  select(item: T) {
    this.onSelect.emit(item);
  }
}
