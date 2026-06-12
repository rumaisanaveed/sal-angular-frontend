import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, finalize } from 'rxjs';
import { DoctorFormComponent } from '../../components/doctors/doctor-form/doctor-form.component';
import { DoctorsTableComponent } from '../../components/doctors/doctors-table/doctors-table.component';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { InputModeEnum } from '../../core/constants';
import { AddDoctorPayload, Doctor, DoctorsList } from '../../core/interfaces/doctors';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { DoctorsService } from '../../core/services/doctors/doctors.service';
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

  searchResults$ = new BehaviorSubject<Doctor[]>([]);
  searchResults = this.searchResults$.asObservable();
  searchTerm = '';
  allDoctors = this.searchResults$.asObservable();

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
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
          _id: doctor._id,
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
      _id: doc._id,
    };

    this.selectedDoctor = mapped;
  }

  submit() {
    if (this.mode === 'manual') {
      if (this.doctorForm.invalid) {
        this.doctorForm.markAllAsTouched();
        return;
      }

      const formValue = this.doctorForm.value;

      const payload: AddDoctorPayload = {
        doctorName: formValue.name ?? '',
        specialityDetails: formValue.speciality ?? '',
        role: formValue.service ?? '',
        status: formValue.doctorType ?? 'current',
      };

      this.addDoctor(payload);
    }

    if (this.mode === 'search' && this.selectedDoctor) {
      const payload = {
        doctorName: this.selectedDoctor.name,
        specialityDetails: this.selectedDoctor.speciality,
        role: this.selectedDoctor.service ?? '',
        status: this.selectedDoctorType ?? 'current',
      };

      this.addDoctor(payload);
    }
  }

  private addDoctor(payload: AddDoctorPayload) {
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
            this.searchResults$.next([]);
            this.searchTerm = '';
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
      this.searchResults$.next([]);
      this.selectedDoctor = null;
      return;
    }

    if (value.trim().length < 3) {
      return;
    }

    this.doctorService.searchDoctor(value.trim()).subscribe({
      next: (data) => {
        const results = this.transformSearchResponse(data);
        this.searchResults$.next(results);
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
      if (this.editDoctorForm.invalid) {
        this.editDoctorForm.markAllAsTouched();
        return;
      }

      this.editDoctor(doctor, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  private editDoctor(doctor: DoctorsList, ref: any) {
    const formValue = this.editDoctorForm.value;

    const payload: AddDoctorPayload = {
      doctorName: formValue.name ?? '',
      specialityDetails: formValue.speciality ?? '',
      role: formValue.speciality ?? '',
      status: formValue.status ?? 'current',
    };

    ref.componentInstance.setLoading(true);

    this.doctorService.update(doctor._id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          ref.close();
          this.toastr.success('Doctor updated successfully.');
          this.loadDoctors();
        }
      },
      error: (err) => {
        const msg = err?.message ?? 'Failed to update doctor.';
        ref.componentInstance.setLoading(false);
        this.toastr.error(msg);
      },
    });
  }

  openDeleteModal(doctor: DoctorsList) {
    this.confirmService
      .open({
        title: 'Delete Doctor',
        description: 'Are you sure you want to delete this doctor?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteDoctor(doctor);
      });
  }

  private deleteDoctor(doctor: DoctorsList) {
    this.doctorService.delete(doctor._id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Doctor deleted successfully.');
          this.loadDoctors();
        }
      },
      error: (error) => {
        const message = error?.message ?? 'Failed to delete doctor.';
        this.toastr.error(message);
      },
    });
  }
}
