import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Medication } from '../../../core/interfaces/medication';
import { DataSource } from '@angular/cdk/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medication-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './medication-table.component.html',
  styleUrl: './medication-table.component.css',
})
export class MedicationTableComponent {
  @Input() data!: DataSource<Medication>;
  @Input() cols: string[] = [];

  @Output() onEdit = new EventEmitter<Medication>();
  @Output() onDelete = new EventEmitter();

  edit(medication: Medication) {
    this.onEdit.emit(medication);
  }

  delete() {
    this.onDelete.emit();
  }
}
