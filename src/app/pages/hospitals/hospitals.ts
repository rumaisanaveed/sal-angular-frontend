import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Hospital, SelectedHospital } from '../../core/interfaces/hospital';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';

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
  ],
  templateUrl: './hospitals.html',
  styleUrl: './hospitals.css',
})
export class Hospitals {
  mode: InputModeEnum = InputModeEnum.Search;
  selectedHospital: SelectedHospital | null = null;

  searchResults: SelectedHospital[] = [
    {
      name: 'City Care Hospital',
      speciality: 'Cardiology',
    },
    {
      name: 'Green Valley Medical Center',
      speciality: 'Internal Medicine',
    },
    {
      name: 'Sunrise Health Clinic',
      speciality: 'General Medicine',
    },
    {
      name: 'National Hospital',
      speciality: 'Neurology',
    },
    {
      name: 'LifeCare Hospital',
      speciality: 'Orthopedics',
    },
  ];

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

  hospitalForm = this.fb.group({
    name: ['', Validators.required],
    service: ['', Validators.required],
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
    service: ['', Validators.required],
    speciality: ['', Validators.required],
    status: ['', Validators.required],
  });

  currentHospitals = new MatTableDataSource<Hospital>(CURRENT_HOSPITALS);
  pastHospitals = new MatTableDataSource<Hospital>(PAST_HOSPITALS);
  columns = ['name', 'service', 'speciality', 'actions'];

  allHospitals = [...this.searchResults];

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  searchHospital(value: string) {
    const v = value.toLowerCase();

    this.searchResults = this.allHospitals.filter(
      (d) => d.name.toLowerCase().includes(v) || d.speciality?.toLowerCase().includes(v),
    );
  }

  selectHospital(hospital: SelectedHospital) {
    this.selectedHospital = hospital;
  }

  openEditModal(hospital: Hospital) {
    this.editHospitalForm.patchValue(hospital);
    const ref = this.modal.open('Edit Hospital', this.editModalContent);
    ref.componentInstance.save.subscribe(() => {
      this.editHospitalForm.markAllAsTouched();

      if (this.editHospitalForm.invalid) return;

      ref.close();
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  openDeleteModal() {
    this.confirmService.open({
      title: 'Delete Hospital',
      description: 'Are you sure you want to delete this hospital?',
      type: 'danger',
    });
  }
}

const CURRENT_HOSPITALS = [
  {
    name: 'City Care Hospital',
    service: 'emergency_trauma',
    speciality: 'Cardiology',
    status: 'active',
  },
  {
    name: 'Green Valley Medical Center',
    service: 'general_medicine',
    speciality: 'Internal Medicine',
    status: 'active',
  },
  {
    name: 'Sunrise Health Clinic',
    service: 'outpatient',
    speciality: 'General Medicine',
    status: 'active',
  },
  {
    name: 'Al-Shifa Medical Complex',
    service: 'maternity',
    speciality: 'Gynecology',
    status: 'active',
  },
  {
    name: 'Prime Health Center',
    service: 'physiotherapy',
    speciality: 'Rehabilitation',
    status: 'active',
  },
  {
    name: 'Prime Health Center',
    service: 'physiotherapy',
    speciality: 'Rehabilitation',
    status: 'active',
  },
  {
    name: 'Prime Health Center',
    service: 'physiotherapy',
    speciality: 'Rehabilitation',
    status: 'active',
  },
];

const PAST_HOSPITALS = [
  {
    name: 'National Hospital',
    service: 'general_medicine',
    speciality: 'Neurology',
    status: 'inactive',
  },
  {
    name: 'LifeCare Hospital',
    service: 'surgery',
    speciality: 'Orthopedics',
    status: 'inactive',
  },
  {
    name: 'Medicare Hospital',
    service: 'radiology',
    speciality: 'Diagnostics',
    status: 'inactive',
  },
  {
    name: 'CareWell Hospital',
    service: 'oncology',
    speciality: 'Cancer Care',
    status: 'inactive',
  },
  {
    name: 'CareWell Hospital',
    service: 'oncology',
    speciality: 'Cancer Care',
    status: 'inactive',
  },
  {
    name: 'CareWell Hospital',
    service: 'oncology',
    speciality: 'Cancer Care',
    status: 'inactive',
  },
];
