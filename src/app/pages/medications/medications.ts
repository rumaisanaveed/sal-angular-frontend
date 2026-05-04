import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MedicationTableComponent } from '../../components/medications/medication-table.component/medication-table.component';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { InputModeEnum } from '../../core/constants';
import { Medication } from '../../core/interfaces/medication';
import { SelectableListComponent } from '../../components/selectable-list/selectable-list.component';
import { SelectedItemComponent } from '../../components/selected-item/selected-item.component';
import { CdkNoDataRow } from '@angular/cdk/table';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';

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
    ModeSwitchCardComponent,
    SelectedItemComponent,
    SelectableListComponent,
    MatIconModule,
  ],
})
export class Medications {
  medicationForm!: FormGroup;
  editMedicationForm!: FormGroup;
  mode: InputModeEnum = InputModeEnum.Search;
  dataSource = new MatTableDataSource(MEDICATIONS_DATA);
  columns = ['name', 'dosage', 'actions'];

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private confirmService: ConfirmationModalService,
  ) {
    this.medicationForm = this.fb.group({
      mode: ['search'],
      name: [''],
      dosage: [''],
      search: [''],
    });
    this.editMedicationForm = this.fb.group({
      name: ['', Validators.required],
      dosage: ['', Validators.required],
    });
  }

  searchResults = [
    { name: 'Paracetamol', dosage: '500mg' },
    { name: 'Ibuprofen', dosage: '200mg' },
  ];

  dosages: { label: string; value: string }[] = [
    // mg
    { label: '0.5 mg', value: '0.5mg' },
    { label: '1 mg', value: '1mg' },
    { label: '2.5 mg', value: '2.5mg' },
    { label: '5 mg', value: '5mg' },
    { label: '10 mg', value: '10mg' },
    { label: '15 mg', value: '15mg' },
    { label: '20 mg', value: '20mg' },
    { label: '25 mg', value: '25mg' },
    { label: '30 mg', value: '30mg' },
    { label: '40 mg', value: '40mg' },
    { label: '50 mg', value: '50mg' },
    { label: '60 mg', value: '60mg' },
    { label: '75 mg', value: '75mg' },
    { label: '80 mg', value: '80mg' },
    { label: '100 mg', value: '100mg' },
    { label: '125 mg', value: '125mg' },
    { label: '150 mg', value: '150mg' },
    { label: '200 mg', value: '200mg' },
    { label: '250 mg', value: '250mg' },
    { label: '300 mg', value: '300mg' },
    { label: '400 mg', value: '400mg' },
    { label: '500 mg', value: '500mg' },
    { label: '600 mg', value: '600mg' },
    { label: '750 mg', value: '750mg' },
    { label: '800 mg', value: '800mg' },
    { label: '1000 mg', value: '1000mg' },

    // ml
    { label: '0.5 ml', value: '0.5ml' },
    { label: '1 ml', value: '1ml' },
    { label: '2 ml', value: '2ml' },
    { label: '5 ml', value: '5ml' },
    { label: '10 ml', value: '10ml' },
    { label: '15 ml', value: '15ml' },
    { label: '20 ml', value: '20ml' },
    { label: '25 ml', value: '25ml' },
    { label: '30 ml', value: '30ml' },
    { label: '50 ml', value: '50ml' },
    { label: '100 ml', value: '100ml' },
    { label: '250 ml', value: '250ml' },
    { label: '500 ml', value: '500ml' },
    { label: '1000 ml', value: '1000ml' },

    // mcg
    { label: '1 mcg', value: '1mcg' },
    { label: '5 mcg', value: '5mcg' },
    { label: '10 mcg', value: '10mcg' },
    { label: '25 mcg', value: '25mcg' },
    { label: '50 mcg', value: '50mcg' },
    { label: '100 mcg', value: '100mcg' },
    { label: '250 mcg', value: '250mcg' },
    { label: '500 mcg', value: '500mcg' },
    { label: '1000 mcg', value: '1000mcg' },

    // unit
    { label: '1 unit', value: '1unit' },
    { label: '2 units', value: '2units' },
    { label: '5 units', value: '5units' },
    { label: '10 units', value: '10units' },
    { label: '15 units', value: '15units' },
    { label: '20 units', value: '20units' },
    { label: '25 units', value: '25units' },
    { label: '30 units', value: '30units' },
    { label: '40 units', value: '40units' },
    { label: '50 units', value: '50units' },
    { label: '75 units', value: '75units' },
    { label: '100 units', value: '100units' },

    { label: 'Other', value: 'other' },
  ];

  selectedMedication: Medication | null = null;

  switchMode(mode: InputModeEnum) {
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

  openEditModal(medication: Medication) {
    this.selectedMedication = medication;
    this.editMedicationForm.patchValue(medication);
    const ref = this.modal.open('Edit Medication', this.editModalContent);
    ref.componentInstance.save.subscribe(() => {
      if (this.editMedicationForm.invalid) {
        return;
      }
      // console.log('Edit allergy form data', this.editAllergyForm.value);
      ref.close();
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  openDeleteModal() {
    this.confirmService
      .open({
        title: 'Delete Medication',
        description: 'Are you sure you want to delete this medication?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) {
        }
      });
  }

  submit() {
    if (this.mode === 'manual' && this.medicationForm.invalid) {
      this.medicationForm.markAllAsTouched();
      return;
    }
  }
}

const MEDICATIONS_DATA: Medication[] = [
  {
    name: 'Paracetamol',
    dosage: '500mg',
  },
  {
    name: 'Ibuprofen',
    dosage: '200mg',
  },
  {
    name: 'Amoxicillin',
    dosage: '250mg',
  },
  {
    name: 'Azithromycin',
    dosage: '500mg',
  },
  {
    name: 'Metformin',
    dosage: '500mg',
  },
  {
    name: 'Aspirin',
    dosage: '75mg',
  },
  {
    name: 'Loratadine',
    dosage: '10mg',
  },
];
