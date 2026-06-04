import { Component, inject, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterButtonsComponent } from '../footer-buttons/footer-buttons.component';
import { AccountTabService } from '../../../core/services/account-tab/account-tab.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountDetailsRequest, ChangePasswordPayload } from '../../../core/interfaces/settings';

@Component({
  selector: 'app-account-tab',
  imports: [MatTabsModule, MatInputModule, FooterButtonsComponent, ReactiveFormsModule],
  templateUrl: './account-tab.component.html',
  styleUrl: './account-tab.component.css',
})
export class AccountTabComponent implements OnInit {
  saving = signal(false);

  private toastr = inject(ToastrService);
  private accountsService = inject(AccountTabService);
  private fb = inject(FormBuilder);

  accountsForm = this.fb.group({
    fullName: [''],
    email: [''],
    ssn: [''],
    memberId: [''],
  });

  passwordForm = this.fb.group({
    currentPassword: [''],
    newPassword: [''],
  });

  ngOnInit(): void {
    this.accountsForm.controls.email.disable();
    this.accountsForm.controls.memberId.disable();
    this.getAccountDetails();
  }

  private getAccountDetails() {
    this.accountsService.getAccountDetails().subscribe({
      next: (res) => {
        if (res.success) {
          const data = res?.data;
          this.accountsForm.patchValue({
            email: data?.email ?? '',
            fullName: data?.fullName ?? '',
            memberId: data?.memberId ?? '',
            ssn: data?.ssn ?? '',
          });
        }
      },
      error: (err) => {
        console.log('Error getting account details', err);
      },
    });
  }

  updateAccountDetails() {
    this.accountsForm.disable();
    this.saving.set(true);

    const formValues = this.accountsForm.getRawValue();

    const payload: AccountDetailsRequest = {
      fullName: formValues.fullName ?? '',
      ssn: formValues.ssn ?? '',
    };

    this.accountsService
      .updateAccountDetails(payload)
      .pipe(
        finalize(() => {
          this.accountsForm.enable();

          this.accountsForm.controls.email.disable();
          this.accountsForm.controls.memberId.disable();

          this.saving.set(false);
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Account info updated successfully.');
            this.getAccountDetails();
          }
        },
        error: (err) => {
          const message = err?.error
            ? err.error.message
            : err?.message
              ? err.message
              : 'Failed to update account details.';
          this.toastr.error(message);
        },
      });
  }

  updatePassword() {
    this.passwordForm.disable();
    this.saving.set(true);

    const formValues = this.passwordForm.getRawValue();

    const payload: ChangePasswordPayload = {
      currentPassword: formValues.currentPassword ?? '',
      newPassword: formValues.newPassword ?? '',
      confirmNewPassword: this.passwordForm.value.newPassword ?? '',
    };

    this.accountsService
      .updatePassword(payload)
      .pipe(
        finalize(() => {
          this.passwordForm.enable();
          this.saving.set(false);
        }),
      )
      .subscribe({
        next: (res) => {
          this.toastr.success('Password updated successfully.');
        },
        error: (err) => {
          const message = err?.error
            ? err.error.message
            : err?.message
              ? err.message
              : 'Failed to update password.';
          this.toastr.error(message);
        },
      });
  }
}
