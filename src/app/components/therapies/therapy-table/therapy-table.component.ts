import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Therapy } from '../../../core/interfaces/therapies';

@Component({
  selector: 'app-therapy-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './therapy-table.component.html',
  styleUrl: './therapy-table.component.css',
})
export class TherapyTableComponent {
  @Input() data!: MatTableDataSource<Therapy>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Therapy>();
  @Output() onDelete = new EventEmitter();

  edit(therapy: Therapy) {
    this.onEdit.emit(therapy);
  }

  delete(therapy: Therapy) {
    this.onDelete.emit(therapy);
  }
}
