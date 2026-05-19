import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ProceduresTableComponent } from '../../components/procedures/procedures-table/procedures-table.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Procedure } from '../../core/interfaces/procedures';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { MatButtonModule } from '@angular/material/button';

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
  dataSource = new MatTableDataSource<Procedure>(PROCEDURES_DATA);

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
  private confirmService = inject(ConfirmationModalService);

  procedureForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    code: ['', Validators.required],
    date: ['', Validators.required],
    details: ['', Validators.required],
  });

  editProcedureForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    code: ['', Validators.required],
    date: ['', Validators.required],
    details: ['', Validators.required],
  });

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
      ref.close();
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  openDeleteModal() {
    this.confirmService.open({
      title: 'Delete Procedure',
      description: 'Are you sure you want to delete this procedure?',
      type: 'danger',
    });
  }

  submit() {
    if (this.procedureForm.invalid) {
      this.procedureForm.markAllAsTouched();
      return;
    }
  }
}

export const PROCEDURES_DATA: Procedure[] = [
  {
    name: 'Appendectomy',
    type: 'surgical',
    details: 'Surgical removal of the appendix',
    code: 'PROC-001',
    date: '2026-01-10',
  },
  {
    name: 'Coronary Artery Bypass',
    type: 'surgical',
    details: 'Procedure to improve blood flow to the heart',
    code: 'PROC-002',
    date: '2026-02-05',
  },
  {
    name: 'Cataract Surgery',
    type: 'surgical',
    details: 'Removal of the eye lens and replacement with artificial lens',
    code: 'PROC-003',
    date: '2026-03-12',
  },
  {
    name: 'Knee Replacement',
    type: 'orthopedic',
    details: 'Replacement of knee joint with prosthesis',
    code: 'PROC-004',
    date: '2026-03-25',
  },
  {
    name: 'MRI Scan',
    type: 'diagnostic',
    details: 'Magnetic resonance imaging diagnostic procedure',
    code: 'PROC-005',
    date: '2026-04-02',
  },
  {
    name: 'Colonoscopy',
    type: 'diagnostic',
    details: 'Examination of the colon using a flexible camera',
    code: 'PROC-006',
    date: '2026-04-18',
  },
  {
    name: 'Blood Test',
    type: 'laboratory',
    details: 'Laboratory analysis of blood sample',
    code: 'PROC-007',
    date: '2026-04-22',
  },
  {
    name: 'CT Scan',
    type: 'diagnostic',
    details: 'Computed tomography imaging procedure',
    code: 'PROC-008',
    date: '2026-05-01',
  },
];
