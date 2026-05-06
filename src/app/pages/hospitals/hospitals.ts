import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SelectableListComponent } from '../../components/selectable-list/selectable-list.component';
import { SelectedItemComponent } from '../../components/selected-item/selected-item.component';
import { InputModeEnum } from '../../core/constants';
import { Hospital, SelectedHospital } from '../../core/interfaces/hospital';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HospitalsTableComponent } from '../../components/hospitals/hospitals-table.component/hospitals-table.component';
import { MatTableDataSource } from '@angular/material/table';

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

  hospitalForm!: FormGroup;

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

  constructor(private fb: FormBuilder) {
    this.hospitalForm = this.fb.group({
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
  }

  currentHospitals = new MatTableDataSource<Hospital>(CURRENT_HOSPITALS);
  pastHospitals = new MatTableDataSource<Hospital>(PAST_HOSPITALS);
  columns = ['name', 'service', 'speciality', 'actions'];

  allHospitals = [...this.searchResults];

  searchHospital(value: string) {
    const v = value.toLowerCase();

    this.searchResults = this.allHospitals.filter(
      (d) => d.name.toLowerCase().includes(v) || d.speciality?.toLowerCase().includes(v),
    );
  }

  selectHospital(hospital: SelectedHospital) {
    this.selectedHospital = hospital;
  }

  openEditModal(hospital: Hospital) {}

  openDeleteModal() {}
}

const CURRENT_HOSPITALS = [
  {
    name: 'City Care Hospital',
    service: 'Emergency & Trauma',
    speciality: 'Cardiology',
    status: 'active',
  },
  {
    name: 'Green Valley Medical Center',
    service: 'General Medicine',
    speciality: 'Internal Medicine',
    status: 'active',
  },
  {
    name: 'Sunrise Health Clinic',
    service: 'Outpatient Services',
    speciality: 'General Medicine',
    status: 'active',
  },
  {
    name: 'Al-Shifa Medical Complex',
    service: 'Maternity & Child Care',
    speciality: 'Gynecology',
    status: 'active',
  },
  {
    name: 'Prime Health Center',
    service: 'Physiotherapy',
    speciality: 'Rehabilitation',
    status: 'active',
  },
  {
    name: 'Prime Health Center',
    service: 'Physiotherapy',
    speciality: 'Rehabilitation',
    status: 'active',
  },
  {
    name: 'Prime Health Center',
    service: 'Physiotherapy',
    speciality: 'Rehabilitation',
    status: 'active',
  },
];

export const PAST_HOSPITALS = [
  {
    name: 'National Hospital',
    service: 'Multi-Specialty',
    speciality: 'Neurology',
    status: 'inactive',
  },
  {
    name: 'LifeCare Hospital',
    service: 'Surgery & ICU',
    speciality: 'Orthopedics',
    status: 'inactive',
  },
  {
    name: 'Medicare Hospital',
    service: 'Radiology & Imaging',
    speciality: 'Diagnostics',
    status: 'inactive',
  },
  {
    name: 'CareWell Hospital',
    service: 'Oncology',
    speciality: 'Cancer Care',
    status: 'inactive',
  },
  {
    name: 'CareWell Hospital',
    service: 'Oncology',
    speciality: 'Cancer Care',
    status: 'inactive',
  },
  {
    name: 'CareWell Hospital',
    service: 'Oncology',
    speciality: 'Cancer Care',
    status: 'inactive',
  },
];
