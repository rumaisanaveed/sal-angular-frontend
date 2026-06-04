import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class ProfileTabComponent {
  profilePreview: string | ArrayBuffer | null = null;
  ekgPreview: string | ArrayBuffer | null = null;
  private fb = inject(FormBuilder);

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
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ];

  profileForm = this.fb.group({
    dob: ['', Validators.required],
    height: ['', Validators.required],
    weight: ['', Validators.required],
    gender: ['', Validators.required],
    bloodType: ['', Validators.required],
    countryOfBirth: ['', Validators.required],
    organDonor: [''],
    nationality: [''],
    smoker: [''],

    emergencyContacts: this.fb.array([this.createEmergencyContact()]),
  });

  get emergencyContacts(): FormArray {
    return this.profileForm.get('emergencyContacts') as FormArray;
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
      this.profilePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  handleEkgUpload(file: File): void {
    const reader = new FileReader();

    reader.onload = () => {
      this.ekgPreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
