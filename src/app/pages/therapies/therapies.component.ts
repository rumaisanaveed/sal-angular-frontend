import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { TherapyFormComponent } from '../../components/therapies/therapy-form/therapy-form.component';
import { TherapyTableComponent } from '../../components/therapies/therapy-table/therapy-table.component';
import { AddTherapyPayload, Therapy } from '../../core/interfaces/therapies';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { TherapiesService } from '../../core/services/therapies/therapies.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-therapies',
  imports: [SearchBarComponent, TherapyTableComponent, TherapyFormComponent, MatButtonModule],
  templateUrl: './therapies.component.html',
  styleUrl: './therapies.component.css',
})
export class TherapiesComponent {
  columns = ['name', 'description', 'frequency', 'duration', 'actions', 'status'];
  dataSource = new MatTableDataSource<Therapy>([]);
  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private therapiesService = inject(TherapiesService);
  private toastr = inject(ToastrService);

  therapyForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    frequency: [''],
    duration: [''],
  });

  editTherapyForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    frequency: [''],
    duration: [''],
  });

  ngOnInit() {
    this.loadTherapies();
  }

  loadTherapies() {
    this.therapiesService.getAll().subscribe({
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

  openEditModal(therapy: Therapy) {
    this.editTherapyForm.patchValue(therapy);
    const ref = this.modal.open('Edit Therapy', this.editModalContent, true, false);

    ref.componentInstance.save.subscribe(() => {
      if (this.editTherapyForm.invalid) {
        this.editTherapyForm.markAllAsTouched();
        return;
      }

      this.editTherapy(therapy, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  editTherapy(therapy: Therapy, ref: any) {
    const formValues = this.editTherapyForm.value;
    const payload: AddTherapyPayload = {
      name: formValues.name ?? '',
      description: formValues.description ?? '',
      duration: formValues.duration ?? '',
      frequency: formValues.frequency ?? '',
      status: therapy.status,
    };

    ref.componentInstance.setLoading(true);

    this.therapiesService.update(therapy._id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          this.toastr.success('Therapy Updated successfully.');
          this.loadTherapies();
          ref.close();
        }
      },
      error: () => {
        ref.componentInstance.setLoading(false);
        this.toastr.error('Failed to update allergy.');
      },
    });
  }

  openDeleteConfirmationModal(therapy: Therapy) {
    this.confirmService
      .open({
        title: 'Delete Therapy',
        description: 'Are you sure you want to delete this therapy?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) this.deleteTherapy(therapy);
      });
  }

  deleteTherapy(therapy: Therapy) {
    this.therapiesService.delete(therapy._id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Therapy deleted successfully.');
          this.loadTherapies();
        }
      },
      error: () => {
        this.toastr.error('Failed to delete therapy');
      },
    });
  }

  addTherapy() {
    if (this.therapyForm.invalid) {
      this.therapyForm.markAllAsTouched();
      return;
    }

    const formValues = this.therapyForm.value;

    const payload: AddTherapyPayload = {
      name: formValues.name ?? '',
      description: formValues.description ?? '',
      duration: formValues.duration ?? '',
      frequency: formValues.frequency ?? '',
      status: 'active',
    };

    this.therapyForm.disable();

    this.therapiesService
      .add(payload)
      .pipe(
        finalize(() => {
          this.therapyForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data?.message || 'Therapy added successfully.');
            this.therapyForm.reset();
            this.loadTherapies();
          }
        },
        error: (err) => {
          const message = err?.error?.message || 'Failed to add therapy.';
          this.toastr.error(message);
        },
      });
  }
}
