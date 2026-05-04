import { DataSource } from '@angular/cdk/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-conditions-table',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './conditions-table.component.html',
  styleUrl: './conditions-table.component.css',
})
export class ConditionsTableComponent {
  @Input() data!: DataSource<Condition>;
  @Input() cols: string[] = [];

  @Output() onEdit = new EventEmitter<Condition>();
  @Output() onDelete = new EventEmitter();

  edit(medication: Condition) {
    this.onEdit.emit(medication);
  }

  delete() {
    this.onDelete.emit();
  }
}
