import { DataSource } from '@angular/cdk/table';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Procedure } from '../../../core/interfaces/procedures';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-procedures-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './procedures-table.component.html',
  styleUrl: './procedures-table.component.css',
})
export class ProceduresTableComponent {
  @Input() data!: DataSource<Procedure>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Procedure>();
  @Output() onDelete = new EventEmitter();

  edit(procedure: Procedure) {
    this.onEdit.emit(procedure);
  }

  delete(procedure: Procedure) {
    this.onDelete.emit(procedure);
  }
}
