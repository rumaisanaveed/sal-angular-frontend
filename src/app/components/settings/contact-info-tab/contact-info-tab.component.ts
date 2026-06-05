import { Component, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterButtonsComponent } from '../footer-buttons/footer-buttons.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContactInfoService } from '../../../core/services/contact-info/contact-info.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-info-tab',
  imports: [
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    FooterButtonsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-info-tab.component.html',
  styleUrl: './contact-info-tab.component.css',
})
export class ContactInfoTabComponent {
  private fb = inject(FormBuilder);
  private contactInfoService = inject(ContactInfoService);
  private toastr = inject(ToastrService);

  saving = signal(false);

  contactInfoForm = this.fb.group({
    primaryPhoneNumber: [''],
    mobilePhone: [''],
    addressLine1: [''],
    city: [''],
    postalCode: [''],
    state: [''],
    country: [''],
    receiveEmailAlerts: [''],
    receiveTextMessages: [''],
    subscribeToNewsletter: [''],
  });

  ngOnInit(): void {
    this.getContactInfoData();
  }

  private getContactInfoData() {
    this.contactInfoService.get().subscribe({
      next: (res) => {
        if (res.success) {
          const data = res?.data;
          this.contactInfoForm.patchValue({
            ...data,
          });
        }
      },
      error: (err) => {
        console.log('Error getting contact info data', err);
      },
    });
  }

  updateContactInfo() {
    this.contactInfoForm.disable();
    this.saving.set(true);

    const formValues = this.contactInfoForm.getRawValue();

    const payload = {
      ...formValues,
    };

    this.contactInfoService
      .update(payload)
      .pipe(
        finalize(() => {
          this.contactInfoForm.enable();
          this.saving.set(false);
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Contact info updated successfully.');
            this.getContactInfoData();
          }
        },
        error: (err) => {
          const message = err?.error
            ? err.error.message
            : err?.message
              ? err.message
              : 'Failed to update contact info.';
          this.toastr.error(message);
        },
      });
  }
}
