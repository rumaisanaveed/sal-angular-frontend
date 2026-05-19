import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-verify-otp-modal',
  imports: [CommonModule, FormsModule, MatButtonModule, NgOtpInputModule, ReactiveFormsModule],
  templateUrl: './verify-otp-modal.component.html',
  styleUrl: './verify-otp-modal.component.css',
})
export class VerifyOtpModalComponent {
  private dialogRef = inject(MatDialogRef);

  otp = new FormControl('');

  getOtp(): string {
    return this.otp.value ?? '';
  }

  submit(): void {
    this.dialogRef.close(this.getOtp());
  }
}
