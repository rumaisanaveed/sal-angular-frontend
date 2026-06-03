import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { DoctorsService } from '../../core/services/doctors/doctors.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  private doctorService = inject(DoctorsService);

  mode: InputModeEnum = InputModeEnum.Search;

  selectedDoctor: Doctor | null = null;
  selectedDoctorType: 'current' | 'past' = 'current';

  mainDoctors = new MatTableDataSource<DoctorsList>([]);
  otherDoctors = new MatTableDataSource<DoctorsList>([]);

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

  searchResults: Doctor[] = [];

  allDoctors = [...this.searchResults];

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

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

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAll().subscribe({
      next: (res) => {
        const doctors: DoctorsList[] = res.data.map((doctor: any) => ({
          name: doctor.name,
          speciality: doctor.specialization,
          status: doctor.status,
          id: doctor.id,
        }));

        this.mainDoctors.data = doctors.filter((doctor) => doctor.status === 'current');

        this.otherDoctors.data = doctors.filter((doctor) => doctor.status === 'past');
      },
      error: (err) => {
        console.log('Error fetching doctors', err);
      },
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

  submit() {
    if (this.mode === 'manual') {
      if (this.doctorForm.invalid) {
        this.doctorForm.markAllAsTouched();
        return;
      }

      // this.addDoctor();
    }

    if (this.mode === 'search' && this.selectedDoctor) {
      const payload = {
        ...this.selectedDoctor,
        doctorName: this.selectedDoctor.name,
        specialityDetails: this.selectedDoctor.speciality,
        role: this.selectedDoctor.service ?? '',
        status: this.selectedDoctorType ?? 'current',
      };

      this.addDoctor(payload);
    }
  }

  private addDoctor(payload: Doctor) {
    this.doctorForm.disable();

    this.doctorService
      .add(payload)
      .pipe(
        finalize(() => {
          this.doctorForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data?.message ?? 'Doctor addedd successfully.');
            this.searchResults = [];
            this.selectedDoctor = null;
            this.loadDoctors();
            this.doctorForm.reset({});
          }
        },
        error: (err) => {
          const message = err?.message || 'Failed to add doctor.';
          this.toastr.error(message);
        },
      });
  }

  searchDoctors(value: string) {
    if (!value.trim()) {
      this.searchResults = [];
      this.selectedDoctor = null;
      return;
    }

    if (value.trim().length < 3) {
      return;
    }

    this.doctorService.searchDoctor(value.trim()).subscribe({
      next: (data) => {
        this.searchResults = this.transformSearchResponse(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error getting search results', err);
      },
    });
  }

  private transformSearchResponse(data: any) {
    const providers = data[3] || [];

    return providers.map((item: string[]) => ({
      name: item[1],
      speciality: item[2],
      service: item[2],
      credential: item[4] || '',
      address: item[5],
      phone: item[6],
      city: item[7],
      state: item[8],
      gender: item[3] === 'M' ? 'male' : 'female',
    }));
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
