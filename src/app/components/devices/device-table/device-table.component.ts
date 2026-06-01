import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Device } from '../../../core/interfaces/devices';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-device-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './device-table.component.html',
  styleUrl: './device-table.component.css',
})
export class DeviceTableComponent {
  @Input() data!: MatTableDataSource<Device>;
  @Input() cols: string[] = [];
  @Output() onEdit = new EventEmitter<Device>();
  @Output() onDelete = new EventEmitter();

  edit(device: Device) {
    this.onEdit.emit(device);
  }

  delete(device: Device) {
    this.onDelete.emit(device);
  }
}
