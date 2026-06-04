import { DataSource } from '@angular/cdk/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Hospital } from '../../../core/interfaces/hospital';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hospitals-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './hospitals-table.component.html',
  styleUrl: './hospitals-table.component.css',
})
export class HospitalsTableComponent {
  @Input() data!: DataSource<Hospital>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Hospital>();
  @Output() onDelete = new EventEmitter();

  edit(hospital: Hospital) {
    this.onEdit.emit(hospital);
  }

  delete(hospital: Hospital) {
    this.onDelete.emit(hospital);
  }
}
