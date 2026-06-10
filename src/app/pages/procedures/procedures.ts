import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ProceduresTableComponent } from '../../components/procedures/procedures-table/procedures-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { AddProcedurePayload, Procedure } from '../../core/interfaces/procedures';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { MatButtonModule } from '@angular/material/button';
import { ProceduresService } from '../../core/services/procedures/procedures.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-procedures',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    SearchBarComponent,
    ProceduresTableComponent,
    MatButtonModule,
  ],
  templateUrl: './procedures.html',
  styleUrl: './procedures.css',
})
export class Procedures {
  dataSource = new MatTableDataSource<Procedure>([]);

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;
  selectedProcedure: Procedure | null = null;

  procedureTypes = [
    { label: 'Diagnostic', value: 'diagnostic' },
    { label: 'Surgical', value: 'surgical' },
    { label: 'Therapeutic', value: 'therapeutic' },
    { label: 'Preventive', value: 'preventive' },
    { label: 'Rehabilitation', value: 'rehab' },
    { label: 'Laboratory', value: 'laboratory' },
    { label: 'Orthopedic', value: 'orthopedic' },
  ];

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private proceduresService = inject(ProceduresService);
  private confirmService = inject(ConfirmationModalService);
  private toastr = inject(ToastrService);

  procedureForm = this.fb.group({
    procedureName: ['', Validators.required],
    procedureType: ['', Validators.required],
    medicalCode: ['', Validators.required],
    procedureDate: ['', Validators.required],
    description: ['', Validators.required],
  });

  editProcedureForm = this.fb.group({
    procedureName: ['', Validators.required],
    procedureType: ['', Validators.required],
    medicalCode: ['', Validators.required],
    procedureDate: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadProcedures();
  }

  private loadProcedures() {
    this.proceduresService.getAll().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
      },
      error: (err) => {
        console.log('Error fetching allergies', err);
      },
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openEditModal(procedure: Procedure) {
    this.selectedProcedure = procedure;
    this.editProcedureForm.patchValue(procedure);
    const ref = this.modal.open('Edit Condition', this.editModalContent);

    ref.componentInstance.save.subscribe(() => {
      if (this.editProcedureForm.invalid) {
        return;
      }
      this.editProcedure(procedure, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  editProcedure(procedure: Procedure, ref: any) {
    const formValues = this.editProcedureForm.value;
    const payload: AddProcedurePayload = {
      procedureName: formValues.procedureName ?? '',
      procedureType: formValues.procedureType ?? '',
      procedureDate: formValues.procedureDate ?? '',
      medicalCode: formValues.medicalCode ?? '',
      description: formValues.description ?? '',
    };

    ref.componentInstance.setLoading(true);

    this.proceduresService.update(procedure._id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          this.toastr.success('Procedure Updated successfully.');
          this.loadProcedures();
          ref.close();
        }
      },
      error: () => {
        ref.componentInstance.setLoading(false);
        this.toastr.error('Failed to update procedure.');
      },
    });
  }

  openDeleteModal(procedure: Procedure) {
    this.confirmService
      .open({
        title: 'Delete Procedure',
        description: 'Are you sure you want to delete this procedure?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteProcedure(procedure);
      });
  }

  private deleteProcedure(procedure: Procedure) {
    this.proceduresService.delete(procedure._id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Procedure deleted successfully.');
          this.loadProcedures();
        }
      },
      error: () => {
        this.toastr.error('Failed to delete procedure');
      },
    });
  }

  submit() {
    if (this.procedureForm.invalid) {
      this.procedureForm.markAllAsTouched();
      return;
    }

    const formValues = this.procedureForm.value;

    const payload: AddProcedurePayload = {
      procedureName: formValues.procedureName ?? '',
      procedureType: formValues.procedureType ?? '',
      procedureDate: formValues.procedureDate ?? '',
      medicalCode: formValues.medicalCode ?? '',
      description: formValues.description ?? '',
    };

    this.procedureForm.disable();

    this.proceduresService
      .add(payload)
      .pipe(
        finalize(() => {
          this.procedureForm.enable();
        }),
      )
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.toastr.success(res?.message || 'Procedure added successfully.');
            this.procedureForm.reset();
            this.loadProcedures();
          }
        },
        error: (err) => {
          const message = err?.error?.message || 'Failed to add procedure';
          this.toastr.error(message);
        },
      });
  }
}
