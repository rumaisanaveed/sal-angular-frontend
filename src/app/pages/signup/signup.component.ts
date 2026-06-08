import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { VerifyOtpModalComponent } from '../../components/auth/verify-otp-modal/verify-otp-modal.component';
import { SignupPayload } from '../../core/interfaces/auth';
import { AuthService } from '../../core/services/auth/auth.service';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-signup.component',
  imports: [MatButton, MatCheckbox, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  isLoading = false;

  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator },
  );

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
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const payload: SignupPayload = {
      name: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!,
      role: 'patient',
    };

    this.signupForm.disable();

    this.authService
      .signup(payload)
      .pipe(
        finalize(() => {
          this.signupForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            localStorage.setItem('token', data?.token);
            localStorage.setItem('user', JSON.stringify(data?.data));
            this.toastr.success(data.message ?? 'Patient registered successfully.');
            this.openOtpModal();
          }
        },

        error: (error) => {
          const message =
            error?.error?.message || error?.errors?.join(', ') || 'Something went wrong';

          this.toastr.error(message);
        },
      });
  }
}
