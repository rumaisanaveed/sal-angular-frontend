import { DataSource } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Condition } from '../../../core/interfaces/conditions';

@Component({
  selector: 'app-conditions-table',
  imports: [MatTableModule, CommonModule, MatButtonModule, MatIconModule],
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

  delete(condition: Condition) {
    this.onDelete.emit(condition);
  }
}
