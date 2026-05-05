import { Component } from '@angular/core';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { InputModeEnum } from '../../core/constants';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Doctor } from '../../core/interfaces/doctors';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { DoctorFormComponent } from '../../components/doctors/doctor-form/doctor-form.component';

@Component({
  selector: 'app-doctors',
  imports: [
    ModeSwitchCardComponent,
    CommonModule,
    SearchBarComponent,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    DoctorFormComponent,
  ],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors {
  mode: InputModeEnum = InputModeEnum.Search;
  doctorForm!: FormGroup;

  selectedDoctor: Doctor | null = null;
  selectedDoctorType: 'main' | 'other' = 'other';

  doctorFields: { label: string; key: keyof Doctor }[] = [
    { label: 'Name', key: 'name' },
    { label: 'Speciality', key: 'speciality' },
    { label: 'Service', key: 'service' },
    { label: 'Phone No', key: 'phone' },
    { label: 'City', key: 'city' },
    { label: 'Address', key: 'address' },
    { label: 'Gender', key: 'gender' },
    { label: 'Email', key: 'email' },
    { label: 'Sal Id', key: 'salId' },
    { label: 'NPI Number', key: 'npiNum' },
    { label: 'State', key: 'state' },
    { label: 'Credential', key: 'credential' },
  ];

  searchResults: Doctor[] = [
    {
      name: 'Dr. John Smith',
      speciality: 'Cardiology',
      service: 'Cardiology',
      phone: '123-456-7890',
      city: 'New York',
      address: '123 Main St',
      gender: 'male',
      email: 'john.smith@example.com',
    },
    {
      name: 'Dr. Sarah Johnson',
      speciality: 'Neurology',
      service: 'Neurology',
      phone: '987-654-3210',
      city: 'Los Angeles',
      address: '456 Sunset Blvd',
      gender: 'female',
    },
    {
      name: 'Dr. Ali Khan',
      speciality: 'Orthopedics',
      service: 'Orthopedics',
      phone: '0300-1234567',
      city: 'Karachi',
      address: 'Clifton Block 5',
      gender: 'male',
    },
  ];

  mainDoctors: Doctor[] = [];
  otherDoctors: Doctor[] = [];

  allDoctors = [...this.searchResults];

  constructor(private fb: FormBuilder) {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      service: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      speciality: ['', Validators.required],
      gender: ['', Validators.required],
      doctorType: [null, Validators.required],

      // optional fields
      state: [''],
      email: [''],
      npi: [''],
      credential: [''],
      salId: [''],
    });
  }

  selectDoctor(doc: Doctor) {
    const mapped: Doctor = {
      name: doc.name || '',
      service: doc.service || 'other',
      phone: doc.phone || '',
      city: doc.city || '',
      address: doc.address || '',
      speciality: doc.speciality || '',
      gender: doc.gender || '',
    };

    this.selectedDoctor = mapped;
  }

  searchDoctors(value: string) {
    const v = value.toLowerCase();

    this.searchResults = this.allDoctors.filter(
      (d) =>
        d.name.toLowerCase().includes(v) ||
        d.speciality?.toLowerCase().includes(v) ||
        d.city?.toLowerCase().includes(v),
    );
  }
}
