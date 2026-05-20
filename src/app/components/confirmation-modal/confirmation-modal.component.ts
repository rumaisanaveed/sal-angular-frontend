import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  imports: [MatIconModule, CommonModule, MatButtonModule],
})
export class ConfirmationModalComponent {
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      description: string;
      type?: 'success' | 'danger';
    },
  ) {}

  confirm() {
    this.isLoading = true;
    this.dialogRef.close(true);
  }

  cancel() {
    if (this.isLoading) return;
    this.dialogRef.close(false);
  }
}
