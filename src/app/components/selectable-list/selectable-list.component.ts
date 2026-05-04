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

  @Output() onSelect = new EventEmitter<T>();
  select(item: T) {
    this.onSelect.emit(item);
  }

  // getLabel(item: T): string {
  //   return String(item[this.labelKey] ?? '');
  // }

  // getSubLabel(item: T): string {
  //   if (!this.subLabelKey) return '';
  //   return String(item[this.subLabelKey] ?? '');
  // }
}
