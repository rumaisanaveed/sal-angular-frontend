import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Allergy } from '../../../core/interfaces/allergies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allergy-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './allergy-table.component.html',
  styleUrl: './allergy-table.component.css',
})
export class AllergyTableComponent {
  @Input() data!: MatTableDataSource<Allergy>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Allergy>();
  @Output() onDelete = new EventEmitter();

  edit(allergy: Allergy) {
    this.onEdit.emit(allergy);
  }

  delete(allergy: Allergy) {
    this.onDelete.emit(allergy);
  }
}
