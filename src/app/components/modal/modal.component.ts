import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ModalData {
  title: string;
  content: any;
  showButtons?: boolean;
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule, CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) {}

  close() {
    this.dialogRef.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }

  onSave() {
    this.save.emit();
  }

  setLoading(state: boolean) {
    this.isLoading = state;
  }
}
