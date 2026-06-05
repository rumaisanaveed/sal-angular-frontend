import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmergencyContactsComponent } from '../emergency-contacts/emergency-contacts.component';
import { UploadProfileImageComponent } from '../upload-profile-image.component/upload-profile-image.component';
import { ImageUploadComponent } from '../../../image-upload.component/image-upload.component';
import { FooterButtonsComponent } from '../../footer-buttons/footer-buttons.component';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProfileInfoResponse } from '../../../../core/interfaces/settings';

@Component({
  selector: 'app-profile-tab',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    EmergencyContactsComponent,
    UploadProfileImageComponent,
    ImageUploadComponent,
    FooterButtonsComponent,
  ],
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.css',
})
export class ProfileTabComponent implements OnInit {
  profilePreview: string | ArrayBuffer | null = null;
  ekgPreview: string | ArrayBuffer | null = null;

  saving = signal(false);

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'A+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  countries = [
    { value: 'canada', label: 'Canada' },
    {
      value: 'united states',
      label: 'United States',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  yesNoOptions = [
    {
      value: true,
      label: 'Yes',
    },
    {
      value: false,
      label: 'No',
    },
  ];

  profileForm = this.fb.group({
    dateOfBirth: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    gender: ['', Validators.required],
    bloodType: ['', Validators.required],
    countryOfBirth: ['', Validators.required],
    organDonor: [''],
    nationality: [''],
    isSmoker: [false],

    emergencyContacts: this.fb.array([this.createEmergencyContact()]),
  });

  get emergencyContacts(): FormArray {
    return this.profileForm.get('emergencyContacts') as FormArray;
  }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  private getProfileInfo() {
    this.profileService.get().subscribe({
      next: (res) => {
        if (res.success) {
          const data = res.data;

          this.emergencyContacts.clear();

          data.emergencyContacts?.forEach((contact: any) => {
            this.emergencyContacts.push(
              this.fb.group({
                name: [contact.name],
                phone: [contact.phone],
                relation: [contact.relation],
                allowReleaseMedicalInfo: [contact.allowReleaseMedicalInfo],
              }),
            );
          });

          this.profileForm.patchValue({
            dateOfBirth: data.dateOfBirth,
            height: data.height,
            weight: data.weight,
            gender: data.gender,
            bloodType: data.bloodType,
            countryOfBirth: data.countryOfBirth,
            organDonor: data.organDonor,
            nationality: data.nationality,
            isSmoker: Boolean(data.isSmoker),
          });

          this.profilePreview = data.profilePicUrl;
          this.ekgPreview = data.ekgUrl;
        }
      },
      error: (err) => {
        console.log('Error getting profile info', err);
      },
    });
  }

  createEmergencyContact(): FormGroup {
    return this.fb.group({
      name: [''],
      phone: [''],
      relation: [''],
    });
  }

  addEmergencyContact(): void {
    this.emergencyContacts.push(this.createEmergencyContact());
  }

  removeEmergencyContact(index: number): void {
    if (this.emergencyContacts.length > 1) {
      this.emergencyContacts.removeAt(index);
    }
  }

  handleProfileUpload(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.profilePreview = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);

    this.profileService.uploadImage(file).subscribe({
      next: (res) => {
        if (res.success) {
          this.profilePreview = res.fileUrl;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        const msg = err?.message ? err.message : 'Failed to upload profile image.';
        this.toastr.error(msg);
      },
    });
  }

  handleEkgUpload(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.ekgPreview = reader.result as string;
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);

    this.profileService.uploadImage(file).subscribe({
      next: (res) => {
        if (res.success) {
          this.ekgPreview = res.fileUrl;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        const msg = err?.message ? err.message : 'Failed to upload ekg image.';
        this.toastr.error(msg);
      },
    });
  }

  updateProfile() {
    this.profileForm.disable();
    this.saving.set(true);

    const formValues = this.profileForm.getRawValue();

    const payload = {
      ...formValues,
      profilePicUrl: this.profilePreview as string,
      ekgUrl: this.ekgPreview as string,
    };

    this.profileService
      .update(payload)
      .pipe(
        finalize(() => {
          this.profileForm.enable();
          this.saving.set(false);
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success('Profile updated successfully.');
            this.getProfileInfo();
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

  cancelFormSubmission() {
    this.getProfileInfo();
  }
}
