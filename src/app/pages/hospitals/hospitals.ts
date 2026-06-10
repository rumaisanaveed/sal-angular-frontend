import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { HospitalsTableComponent } from '../../components/hospitals/hospitals-table.component/hospitals-table.component';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SelectableListComponent } from '../../components/selectable-list/selectable-list.component';
import { SelectedItemComponent } from '../../components/selected-item/selected-item.component';
import { InputModeEnum } from '../../core/constants';
import { AddHospitalPayload, Hospital, SelectedHospital } from '../../core/interfaces/hospital';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { HospitalsService } from '../../core/services/hospitals/hospitals.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospitals',
  imports: [
    ModeSwitchCardComponent,
    CommonModule,
    SearchBarComponent,
    SelectableListComponent,
    SelectedItemComponent,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    HospitalsTableComponent,
    FormsModule,
  ],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css',
})
export class Hospitals {
  mode: InputModeEnum = InputModeEnum.Search;
  selectedHospital: SelectedHospital | null = null;

  searchResults: SelectedHospital[] = [];

  services = [
    { label: 'Emergency & Trauma', value: 'emergency_trauma' },
    { label: 'General Medicine', value: 'general_medicine' },
    { label: 'Outpatient Services (OPD)', value: 'outpatient' },
    { label: 'Inpatient Services (IPD)', value: 'inpatient' },
    { label: 'Surgery', value: 'surgery' },
    { label: 'Intensive Care Unit (ICU)', value: 'icu' },
    { label: 'Maternity & Child Care', value: 'maternity' },
    { label: 'Cardiology', value: 'cardiology' },
    { label: 'Orthopedics', value: 'orthopedics' },
    { label: 'Neurology', value: 'neurology' },
    { label: 'Radiology & Imaging', value: 'radiology' },
    { label: 'Laboratory Services', value: 'laboratory' },
    { label: 'Pharmacy', value: 'pharmacy' },
    { label: 'Dialysis', value: 'dialysis' },
    { label: 'Physiotherapy', value: 'physiotherapy' },
    { label: 'Oncology (Cancer Care)', value: 'oncology' },
    { label: 'ENT (Ear, Nose, Throat)', value: 'ent' },
    { label: 'Dermatology', value: 'dermatology' },
    { label: 'Psychiatry & Mental Health', value: 'psychiatry' },
    { label: 'Other', value: 'other' },
  ];

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private hospitalsService = inject(HospitalsService);
  private cdr = inject(ChangeDetectorRef);
  private toastr = inject(ToastrService);

  hospitalForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    speciality: ['', Validators.required],
    status: ['', Validators.required],
    npi: [''],
    salId: [''],
    email: [''],
  });

  editHospitalForm = this.fb.group({
    name: ['', Validators.required],
    speciality: ['', Validators.required],
    status: ['', Validators.required],
    npiNumber: [''],
  });

  currentHospitals = new MatTableDataSource<Hospital>([]);
  pastHospitals = new MatTableDataSource<Hospital>([]);
  columns = ['name', 'npiNumber', 'speciality', 'actions'];

  allHospitals = [...this.searchResults];

  selectedHospitalType: 'active' | 'inactive' = 'active';

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  ngOnInit(): void {
    this.loadHospitals();
  }

  private loadHospitals() {
    this.hospitalsService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          const hospitals: Hospital[] = res.data.map((hosp: Hospital) => ({
            name: hosp.name,
            npiNumber: hosp.npiNumber,
            speciality: hosp.speciality,
            _id: hosp._id,
            status: hosp.status,
            phone: '',
          }));

          this.currentHospitals.data = hospitals.filter((hosp) => hosp.status === 'active');

          this.pastHospitals.data = hospitals.filter((hosp) => hosp.status === 'inactive');
        }
      },
      error: (err) => {
        console.log('Error fetching hospitals', err);
      },
    });
  }

  searchHospital(value: string) {
    if (!value.trim()) {
      this.searchResults = [];
      this.selectedHospital = null;
      return;
    }

    if (value.trim().length < 3) {
      return;
    }

    this.hospitalsService.searchHospital(value.trim()).subscribe({
      next: (data) => {
        this.searchResults = this.transformSearchResponse(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error getting search results', err);
      },
    });
  }

  private transformSearchResponse(data: any): SelectedHospital[] {
    const providers = data?.[3] ?? [];

    return providers.map((item: string[]) => ({
      npiNumber: item[0],
      name: item[1],
      speciality: item[2],
      address: item[3],
      phone: item[4],
    }));
  }

  selectHospital(hospital: SelectedHospital) {
    this.selectedHospital = hospital;
  }

  submit() {
    if (this.mode === 'manual') {
      if (this.hospitalForm.invalid) {
        this.hospitalForm.markAllAsTouched();
        return;
      }

      const formValues = this.hospitalForm.value;

      const payload: AddHospitalPayload = {
        name: formValues.name ?? '',
        speciality: formValues.speciality ?? '',
        status: formValues.status ?? 'active',
        phone: formValues.phone ?? '',
        npiNumber: formValues.npi ?? '',
      };

      this.addHospital(payload);
    }

    if (this.mode === 'search' && this.selectedHospital) {
      const payload: AddHospitalPayload = {
        name: this.selectedHospital.name,
        speciality: this.selectedHospital.speciality ?? '',
        status: this.selectedHospitalType ?? 'active',
        phone: this.selectedHospital.phone ?? '',
        npiNumber: this.selectedHospital.npiNumber,
      };

      this.addHospital(payload);
    }
  }

  private addHospital(hospital: AddHospitalPayload) {
    this.hospitalForm.disable();

    this.hospitalsService
      .add(hospital)
      .pipe(
        finalize(() => {
          this.hospitalForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data?.message ?? 'Hospital addedd successfully.');
            this.searchResults = [];
            this.selectedHospital = null;
            this.loadHospitals();
            this.hospitalForm.reset({});
          }
        },
        error: (err) => {
          const message = err?.message || 'Failed to add hospital.';
          this.toastr.error(message);
        },
      });
  }

  openEditModal(hospital: Hospital) {
    this.editHospitalForm.patchValue(hospital);
    const ref = this.modal.open('Edit Hospital', this.editModalContent);

    ref.componentInstance.save.subscribe(() => {
      console.log('');

      if (this.editHospitalForm.invalid) {
        this.editHospitalForm.markAllAsTouched();
        return;
      }

      this.editDoctor(hospital, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  private editDoctor(doctor: Hospital, ref: any) {
    const formValues = this.editHospitalForm.value;

    const payload: AddHospitalPayload = {
      name: formValues.name ?? '',
      speciality: formValues.speciality ?? '',
      status: formValues.status ?? 'active',
      npiNumber: formValues.npiNumber ?? '',
    };

    ref.componentInstance.setLoading(true);

    this.hospitalsService.update(doctor._id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          ref.close();
          this.toastr.success('Hospital updated successfully.');
          this.loadHospitals();
        }
      },
      error: (err) => {
        const msg = err?.message ?? 'Failed to update hospital.';
        ref.componentInstance.setLoading(false);
        this.toastr.error(msg);
      },
    });
  }

  openDeleteModal(hospital: Hospital) {
    this.confirmService
      .open({
        title: 'Delete Hospital',
        description: 'Are you sure you want to delete this hospital?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteHospital(hospital);
      });
  }

  private deleteHospital(hospital: Hospital) {
    this.hospitalsService.delete(hospital._id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Hospital deleted successfully.');
          this.loadHospitals();
        }
      },
      error: (error) => {
        const message = error?.message ?? 'Failed to delete hospital.';
        this.toastr.error(message);
      },
    });
  }
}
