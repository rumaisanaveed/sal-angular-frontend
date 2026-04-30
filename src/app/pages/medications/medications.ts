import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Medication } from '../../core/interfaces/medication';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MedicationTableComponent } from '../../components/medications/medication-table.component/medication-table.component';

@Component({
  selector: 'app-medication-form',
  templateUrl: './medications.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    SearchBarComponent,
    MedicationTableComponent,
  ],
})
export class Medications {
  mode: 'manual' | 'search' = 'search';
  medicationForm!: FormGroup;
  modes: { label: string; value: 'manual' | 'search' }[] = [
    { label: 'Search', value: 'search' },
    { label: 'Manual', value: 'manual' },
  ];
  dataSource = new MatTableDataSource(MEDICATIONS_DATA);
  columns = ['name', 'dosage', 'actions'];

  constructor(private fb: FormBuilder) {
    this.medicationForm = this.fb.group({
      mode: ['search'],
      name: [''],
      dosage: [''],
      search: [''],
    });
  }

  searchResults = [
    { name: 'Paracetamol', dosage: '500mg' },
    { name: 'Ibuprofen', dosage: '200mg' },
  ];

  selectedMedication: Medication | null = null;

  switchMode(mode: 'manual' | 'search') {
    this.mode = mode;

    if (this.mode === 'manual') {
      this.medicationForm.get('name')?.setValidators([Validators.required]);
      this.medicationForm.get('dosage')?.setValidators([Validators.required]);
    } else {
      this.medicationForm.get('name')?.clearValidators();
      this.medicationForm.get('dosage')?.clearValidators();
    }

    this.medicationForm.get('name')?.updateValueAndValidity();
    this.medicationForm.get('dosage')?.updateValueAndValidity();

    this.medicationForm.patchValue({
      name: '',
      dosage: '',
    });
    this.selectedMedication = null;
  }

  selectMedication(med: Medication) {
    this.selectedMedication = med;

    this.medicationForm.patchValue({
      name: med.name,
      dosage: med.dosage,
    });
  }

  searchMedication(value: string) {}

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openEditModal(medication: Medication) {}

  openDeleteModal() {}

  submit() {
    if (this.mode === 'manual' && this.medicationForm.invalid) {
      this.medicationForm.markAllAsTouched();
      return;
    }

    // console.log(this.medicationForm.value);
  }
}

const MEDICATIONS_DATA: Medication[] = [
  {
    name: 'Panadol',
    dosage: '20 mg',
  },
  {
    name: 'Paracetamol',
    dosage: '5 mg',
  },
  {
    name: 'Panadol',
    dosage: '20 mg',
  },
  {
    name: 'Paracetamol',
    dosage: '5 mg',
  },
  {
    name: 'Paracetamol',
    dosage: '5 mg',
  },
  {
    name: 'Paracetamol',
    dosage: '5 mg',
  },
  {
    name: 'Paracetamol',
    dosage: '5 mg',
  },
];
