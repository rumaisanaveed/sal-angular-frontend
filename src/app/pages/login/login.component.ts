import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/interfaces/auth';
import { MatDialog } from '@angular/material/dialog';
import { VerifyOtpModalComponent } from '../../components/auth/verify-otp-modal/verify-otp-modal.component';

@Component({
  selector: 'app-login.component',
  imports: [MatButton, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  openOtpModal() {
    const ref = this.dialog.open(VerifyOtpModalComponent, {
      width: '420px',
      disableClose: true,
      autoFocus: false,
      panelClass: 'otp-dialog',
    });

    ref.afterClosed().subscribe((otp: string | null) => {
      if (!otp) return;
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.loginForm.disable();

    this.authService
      .login(payload)
      .pipe(
        finalize(() => {
          this.loginForm.enable();
        }),
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            localStorage.setItem('token', response?.token);
            localStorage.setItem('user', JSON.stringify(response?.data));
            if (response.verificationRequired) {
              this.openOtpModal();
            } else {
              this.toastr.success(response?.message || 'Login successful');
              this.router.navigate(['/allergies']);
            }
          }
        },
        error: (error) => {
          const message = error?.error?.message || 'Something went wrong';
          this.toastr.error(message);
        },
      });
  }
}
