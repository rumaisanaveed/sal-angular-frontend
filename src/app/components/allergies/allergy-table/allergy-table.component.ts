import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Allergy } from '../../../core/interfaces/allergies';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-allergy-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './allergy-table.component.html',
  styleUrl: './allergy-table.component.css',
})
export class AllergyTableComponent {
  @Input() data!: DataSource<Allergy>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Allergy>();
  @Output() onDelete = new EventEmitter();

  edit(allergy: Allergy) {
    this.onEdit.emit(allergy);
  }

  delete() {
    this.onDelete.emit();
  }
}
