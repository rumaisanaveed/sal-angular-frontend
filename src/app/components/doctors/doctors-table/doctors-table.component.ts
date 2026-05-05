import { DataSource } from '@angular/cdk/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Allergy } from '../../../core/interfaces/allergies';
import { DoctorsList } from '../../../core/interfaces/doctors';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-doctors-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './doctors-table.component.html',
  styleUrl: './doctors-table.component.css',
})
export class DoctorsTableComponent {
  @Input() data!: DataSource<DoctorsList>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Allergy>();
  @Output() onDelete = new EventEmitter();
  @Input() variant: 'main' | 'other' = 'main';

  edit(allergy: Allergy) {
    this.onEdit.emit(allergy);
  }

  delete() {
    this.onDelete.emit();
  }
}
