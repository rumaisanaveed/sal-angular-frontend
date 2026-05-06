import { DataSource } from '@angular/cdk/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DoctorsList } from '../../../core/interfaces/doctors';

@Component({
  selector: 'app-doctors-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './doctors-table.component.html',
  styleUrl: './doctors-table.component.css',
})
export class DoctorsTableComponent {
  @Input() data!: DataSource<DoctorsList>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<DoctorsList>();
  @Output() onDelete = new EventEmitter();
  @Input() variant: 'main' | 'other' = 'main';

  edit(doctor: DoctorsList) {
    this.onEdit.emit(doctor);
  }

  delete() {
    this.onDelete.emit();
  }
}
