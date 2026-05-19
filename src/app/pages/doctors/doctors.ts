import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorFormComponent } from '../../components/doctors/doctor-form/doctor-form.component';
import { DoctorsTableComponent } from '../../components/doctors/doctors-table/doctors-table.component';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { InputModeEnum } from '../../core/constants';
import { Doctor, DoctorsList } from '../../core/interfaces/doctors';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';

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
    DoctorsTableComponent,
  ],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors {
  mode: InputModeEnum = InputModeEnum.Search;

  selectedDoctor: Doctor | null = null;
  selectedDoctorType: 'main' | 'other' = 'other';

  mainDoctors = new MatTableDataSource<DoctorsList>(MAIN_DOCTORS);
  otherDoctors = new MatTableDataSource<DoctorsList>(OTHER_DOCTORS);

  columns = ['name', 'speciality', 'actions'];

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

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

  allDoctors = [...this.searchResults];

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);

  doctorForm = this.fb.group({
    name: ['', Validators.required],
    service: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    phone: ['', Validators.required],
    speciality: ['', Validators.required],
    gender: ['', Validators.required],
    doctorType: ['', Validators.required],

    // optional fields
    state: [''],
    email: [''],
    npi: [''],
    credential: [''],
    salId: [''],
  });

  editDoctorForm = this.fb.group({
    name: ['', Validators.required],
    speciality: ['', Validators.required],
    status: ['', Validators.required],
  });

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

  addDoctor() {
    this.doctorForm.markAllAsTouched();

    if (this.doctorForm.invalid) return;
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

  openEditModal(doctor: DoctorsList) {
    this.editDoctorForm.patchValue(doctor);
    const ref = this.modal.open('Edit Doctor', this.editModalContent);
    ref.componentInstance.save.subscribe(() => {
      this.editDoctorForm.markAllAsTouched();

      if (this.editDoctorForm.invalid) return;

      ref.close();
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  openDeleteModal() {
    this.confirmService.open({
      title: 'Delete Doctor',
      description: 'Are you sure you want to delete this doctor?',
      type: 'danger',
    });
  }
}

const MAIN_DOCTORS: DoctorsList[] = [
  {
    name: 'Dr. Sarah Johnson',
    speciality: 'Cardiology',
    status: 'current',
  },
  {
    name: 'Dr. Michael Brown',
    speciality: 'Neurology',
    status: 'current',
  },
  {
    name: 'Dr. Emily Davis',
    speciality: 'Pediatrics',
    status: 'current',
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedics',
    status: 'current',
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedics',
    status: 'current',
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedics',
    status: 'current',
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedics',
    status: 'current',
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedics',
    status: 'current',
  },
  {
    name: 'Dr. James Wilson',
    speciality: 'Orthopedics',
    status: 'current',
  },
];

const OTHER_DOCTORS: DoctorsList[] = [
  {
    name: 'Dr. Ali Khan',
    speciality: 'General Practice',
    status: 'past',
  },
  {
    name: 'Dr. Olivia Martin',
    speciality: 'Neurology',
    status: 'past',
  },
  {
    name: 'Dr. John Smith',
    speciality: 'Cardiology',
    status: 'past',
  },
  {
    name: 'Dr. Sophia Lee',
    speciality: 'Dermatology',
    status: 'past',
  },
  {
    name: 'Dr. David Miller',
    speciality: 'Orthopedics',
    status: 'past',
  },
  {
    name: 'Dr. Sophia Lee',
    speciality: 'Dermatology',
    status: 'past',
  },
  {
    name: 'Dr. David Miller',
    speciality: 'Orthopedics',
    status: 'past',
  },
  {
    name: 'Dr. Sophia Lee',
    speciality: 'Dermatology',
    status: 'past',
  },
  {
    name: 'Dr. David Miller',
    speciality: 'Orthopedics',
    status: 'past',
  },
];
