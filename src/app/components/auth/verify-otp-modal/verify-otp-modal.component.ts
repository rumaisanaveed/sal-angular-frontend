import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { VerifyOtpPayload } from '../../../core/interfaces/auth';
import { QrCodeService } from '../../../core/services/qr-code/qr-code.service';

@Component({
  selector: 'app-verify-otp-modal',
  imports: [CommonModule, FormsModule, MatButtonModule, NgOtpInputModule, ReactiveFormsModule],
  templateUrl: './verify-otp-modal.component.html',
  styleUrl: './verify-otp-modal.component.css',
})
export class VerifyOtpModalComponent {
  private dialogRef = inject(MatDialogRef);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private qrCodeService = inject(QrCodeService);

  otp = new FormControl('');

  timer = signal(60);
  canResend = signal(false);
  private intervalId: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  getOtp(): string {
    return this.otp.value ?? '';
  }

  startTimer() {
    this.canResend.set(false);
    this.timer.set(60);

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const current = this.timer();

      if (current <= 1) {
        this.timer.set(0);
        this.canResend.set(true);
        clearInterval(this.intervalId);
      } else {
        this.timer.set(current - 1);
      }
    }, 1000);
  }

  submit(): void {
    const payload: VerifyOtpPayload = {
      otp: this.otp.value ?? '',
    };

    this.authService.verifyOtp(payload).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('OTP verified successfully');

          this.qrCodeService.generate().subscribe({
            next: (res) => {
              if (res.success) {
                this.dialogRef.close(true);
                this.router.navigate(['/allergies']);
              }
            },
            error: (err) => {
              console.log('Failed to generate qr code', err);
            },
          });
        }
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'Invalid OTP');
      },
    });
  }

  handleResend() {
    this.authService.resendOtp().subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success(data.message || 'OTP resent successfully');

          this.startTimer();
        }
      },
      error: (error) => {
        this.toastr.error(error?.error?.message || 'Failed to resend OTP');
      },
    });
  }
}
