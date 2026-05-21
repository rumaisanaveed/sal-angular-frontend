import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Medication } from '../../../core/interfaces/medication';

@Component({
  selector: 'app-medication-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './medication-table.component.html',
  styleUrl: './medication-table.component.css',
})
export class MedicationTableComponent {
  @Input() data!: MatTableDataSource<Medication>;
  @Input() cols: string[] = [];

  @Output() onEdit = new EventEmitter<Medication>();
  @Output() onDelete = new EventEmitter();

  edit(medication: Medication) {
    this.onEdit.emit(medication);
  }

  delete(med: Medication) {
    this.onDelete.emit(med);
  }
}
