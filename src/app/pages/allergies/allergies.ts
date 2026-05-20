import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllergyFormComponent } from '../../components/allergies/allergy-form/allergy-form.component';
import { AllergyTableComponent } from '../../components/allergies/allergy-table/allergy-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AddAllergyPayload, Allergy } from '../../core/interfaces/allergies';
import { AllergiesService } from '../../core/services/allergies/allergies.service';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-allergies',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    SearchBarComponent,
    MatIconModule,
    CommonModule,
    AllergyTableComponent,
    AllergyFormComponent,
  ],
  templateUrl: './allergies.html',
  styleUrl: './allergies.css',
})
export class Allergies {
  columns = ['name', 'details', 'status', 'displayOnCard', 'actions'];
  dataSource = new MatTableDataSource<Allergy>([]);
  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private allergiesService = inject(AllergiesService);
  private toastr = inject(ToastrService);

  allergyForm = this.fb.group({
    name: ['', Validators.required],
    details: ['', Validators.required],
  });

  editAllergyForm = this.fb.group({
    name: ['', Validators.required],
    details: ['', Validators.required],
  });

  ngOnInit() {
    this.loadAllergies();
  }

  loadAllergies() {
    this.allergiesService.getAll().subscribe({
      next: (res) => {
        this.dataSource.data = res.data.allergies;
      },
      error: (err) => {
        console.log('Error fetching allergies', err);
      },
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openEditModal(allergy: Allergy) {
    this.editAllergyForm.patchValue(allergy);
    const ref = this.modal.open('Edit Allergy', this.editModalContent, true, false);

    ref.componentInstance.save.subscribe(() => {
      if (this.editAllergyForm.invalid) {
        this.editAllergyForm.markAllAsTouched();
        return;
      }

      this.editAllergy(allergy, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  editAllergy(allergy: Allergy, ref: any) {
    const payload: AddAllergyPayload = {
      name: this.editAllergyForm.value.name ?? '',
      details: this.editAllergyForm.value.details ?? '',
      status: allergy.status ?? 'active',
    };

    ref.componentInstance.setLoading(true);

    this.allergiesService.update(allergy.id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          this.toastr.success('Updated successfully.');
          this.loadAllergies();
          ref.close();
        }
      },
      error: () => {
        ref.componentInstance.setLoading(false);
        this.toastr.error('Failed to update allergy.');
      },
    });
  }

  openDeleteConfirmationModal(allergy: Allergy) {
    this.confirmService
      .open({
        title: 'Delete Allergy',
        description: 'Are you sure you want to delete this allergy?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteAllergy(allergy);
      });
  }

  deleteAllergy(allergy: Allergy) {
    this.allergiesService.delete(allergy.id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Deleted successfully');
          this.loadAllergies();
        }
      },
      error: () => {
        this.toastr.error('Delete failed');
      },
    });
  }

  addAllergy() {
    if (this.allergyForm.invalid) {
      this.allergyForm.markAllAsTouched();
      return;
    }

    const payload: AddAllergyPayload = {
      name: this.allergyForm.value.name ?? '',
      details: this.allergyForm.value.details ?? '',
      status: 'active',
    };

    this.allergyForm.disable();

    this.allergiesService
      .add(payload)
      .pipe(
        finalize(() => {
          this.allergyForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data?.message || 'Allergy added successfully.');
            this.allergyForm.reset();
            this.loadAllergies();
          }
        },
        error: (err) => {
          const message = err?.message || 'Failed to add allergy.';
          this.toastr.error(message);
        },
      });
  }
}
