import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { MedicationTableComponent } from '../../components/medications/medication-table.component/medication-table.component';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SelectableListComponent } from '../../components/selectable-list/selectable-list.component';
import { SelectedItemComponent } from '../../components/selected-item/selected-item.component';
import { DOSAGES } from '../../constants/medications';
import { InputModeEnum } from '../../core/constants';
import {
  AddMedicationPayload,
  Medication,
  MedicationSearchResult,
} from '../../core/interfaces/medication';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { MedicationsService } from '../../core/services/medications/medications.service';
import { ModalService } from '../../core/services/modal-service/modal.service';

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
  mode: InputModeEnum = InputModeEnum.Search;
  dataSource = new MatTableDataSource<Medication>([]);
  columns = ['name', 'dosage', 'status', 'displayOnCard', 'actions'];

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private medicationsService = inject(MedicationsService);
  private toastr = inject(ToastrService);
  private cdr = inject(ChangeDetectorRef);

  searchResults: MedicationSearchResult[] = [];
  selectedMedication: MedicationSearchResult | null = null;

  medicationForm = this.fb.group({
    mode: ['search'],
    medicineName: [''],
    dosage: [''],
  });

  editMedicationForm = this.fb.group({
    medicineName: ['', Validators.required],
    dosage: ['', Validators.required],
  });

  dosages: { label: string; value: string }[] = DOSAGES;

  ngOnInit(): void {
    this.loadMedications();
  }

  loadMedications() {
    this.medicationsService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource.data = res.data.medications;
        }
      },
      error: (err) => {
        console.log('Error fetching medications', err);
      },
    });
  }

  switchMode(mode: InputModeEnum) {
    this.mode = mode;

    if (this.mode === 'manual') {
      this.medicationForm.get('medicineName')?.setValidators([Validators.required]);
      this.medicationForm.get('dosage')?.setValidators([Validators.required]);
    } else {
      this.medicationForm.get('medicineName')?.clearValidators();
      this.medicationForm.get('dosage')?.clearValidators();
    }

    this.medicationForm.get('medicineName')?.updateValueAndValidity();
    this.medicationForm.get('dosage')?.updateValueAndValidity();

    this.medicationForm.patchValue({
      medicineName: '',
      dosage: '',
    });
    this.selectedMedication = null;
  }

  selectMedication(med: MedicationSearchResult) {
    this.selectedMedication = med;
  }

  transformSearchResponse(res: any): MedicationSearchResult[] {
    const names: string[] = res?.[1] ?? [];
    const strengths = res?.[2]?.STRENGTHS_AND_FORMS ?? [];

    return names.map((medicineName, index) => ({
      medicineName,
      dosage: strengths[index]?.[0] ?? '',
    }));
  }

  searchMedication(value: string) {
    if (!value.trim()) {
      this.searchResults = [];
      this.selectedMedication = null;
      return;
    }

    if (value.trim().length < 3) {
      return;
    }

    this.medicationsService.searchMedication(value.trim()).subscribe({
      next: (data) => {
        this.searchResults = this.transformSearchResponse(data);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error getting search results', err);
      },
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openEditModal(medication: Medication) {
    this.editMedicationForm.patchValue({
      medicineName: medication.medicineName,
      dosage: medication.dosage,
    });
    const ref = this.modal.open('Edit Medication', this.editModalContent);
    ref.componentInstance.save.subscribe(() => {
      if (this.editMedicationForm.invalid) {
        this.editMedicationForm.markAllAsTouched();
        return;
      }
      this.editMedication(medication, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  private editMedication(medication: Medication, ref: any) {
    const payload: AddMedicationPayload = {
      medicineName: this.editMedicationForm.value.medicineName ?? '',
      dosage: this.editMedicationForm.value.dosage ?? '',
      status: medication.status,
    };

    ref.componentInstance.setLoading(true);

    this.medicationsService.update(medication.id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          ref.close();
          this.toastr.success('Updated successfully.');
          this.loadMedications();
        }
      },
      error: () => {
        ref.componentInstance.setLoading(false);
        this.toastr.error('Failed to update medication.');
      },
    });
  }

  openDeleteModal(medication: Medication) {
    this.confirmService
      .open({
        title: 'Delete Medication',
        description: 'Are you sure you want to delete this medication?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteMedication(medication);
      });
  }

  private deleteMedication(medication: Medication) {
    this.medicationsService.delete(medication.id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Medication deleted successfully.');
          this.loadMedications();
        }
      },
      error: (error) => {
        const message = error?.message ?? 'Failed to delete medication';
        this.toastr.error(message);
      },
    });
  }

  submit() {
    if (this.mode === 'manual') {
      if (this.medicationForm.invalid) {
        this.medicationForm.markAllAsTouched();
        return;
      }

      const payload: AddMedicationPayload = {
        medicineName: this.medicationForm.value.medicineName ?? '',
        dosage: this.medicationForm.value.dosage ?? '',
        status: 'active',
      };
      this.addMedication(payload);
    }

    if (this.mode === 'search' && this.selectedMedication) {
      const payload: AddMedicationPayload = {
        medicineName: this.selectedMedication.medicineName,
        dosage: this.selectedMedication.dosage,
        status: 'active',
      };
      this.addMedication(payload);
    }
  }

  private addMedication(payload: AddMedicationPayload) {
    this.medicationForm.disable();

    this.medicationsService
      .add(payload)
      .pipe(
        finalize(() => {
          this.medicationForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data.message ?? 'Medication added successfully.');
            this.searchResults = [];
            this.selectedMedication = null;
            this.loadMedications();
            this.medicationForm.reset({});
          }
        },
        error: (error) => {
          const message = error?.message || 'Failed to add medication';
          this.toastr.error(message);
        },
      });
  }
}
