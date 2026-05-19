import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { ModalService } from '../../core/services/modal-service/modal.service';
import { VerifyOtpModalComponent } from '../../components/auth/verify-otp-modal/verify-otp-modal.component';
import { MatDialog } from '@angular/material/dialog';

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

  onSubmit() {}
}
