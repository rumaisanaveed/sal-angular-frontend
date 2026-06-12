import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ConditionsTableComponent } from '../../components/conditions/conditions-table/conditions-table.component';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SelectableListComponent } from '../../components/selectable-list/selectable-list.component';
import { SelectedItemComponent } from '../../components/selected-item/selected-item.component';
import { InputModeEnum } from '../../core/constants';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { ConditionsService } from '../../core/services/conditions/conditions.service';
import { AddConditionPayload, Condition } from '../../core/interfaces/conditions';
import { BehaviorSubject, finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-condition',
  templateUrl: './conditions.html',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    SearchBarComponent,
    MatButtonModule,
    FormsModule,
    ModeSwitchCardComponent,
    SelectedItemComponent,
    SelectableListComponent,
    ConditionsTableComponent,
  ],
})
export class Conditions {
  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);
  private conditionsService = inject(ConditionsService);
  private toastr = inject(ToastrService);

  conditionForm = this.fb.group({
    name: ['', Validators.required],
    details: ['', Validators.required],
  });
  therapyForm = this.fb.group({
    therapy: ['', Validators.required],
  });
  deviceForm = this.fb.group({
    device: ['', Validators.required],
  });
  editConditionForm = this.fb.group({
    name: ['', Validators.required],
    details: ['', Validators.required],
  });

  mode: InputModeEnum = InputModeEnum.Search;

  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  searchResults$ = new BehaviorSubject<Condition[]>([]);
  selectedCondition: Condition | null = null;
  searchTerm = '';

  dataSource = new MatTableDataSource<Condition>([]);

  ngOnInit(): void {
    this.loadConditions();
  }

  loadConditions() {
    this.conditionsService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.dataSource.data = res.data.medicalConditions;
        }
      },
      error: (err) => {
        console.log('Error fetching conditions', err);
      },
    });
  }

  switchMode(mode: InputModeEnum) {
    this.mode = mode;
    this.selectedCondition = null;
    this.searchResults$.next([]);
  }

  searchCondition(query: string) {
    if (!query.trim()) {
      this.searchResults$.next([]);
      return;
    }

    if (query.trim().length < 3) {
      return;
    }

    const q = query.trim().toLowerCase();

    this.conditionsService.searchCondition(q).subscribe({
      next: (data) => {
        const results = this.transformConditionsResponse(data);
        this.searchResults$.next(results);
      },
      error: (err) => {
        console.log('Error fetching search results', err);
      },
    });
  }

  transformConditionsResponse(res: any) {
    const list = res?.[3] ?? [];

    return list.map(([name, details]: string[]) => ({
      name,
      details,
    }));
  }

  selectCondition(condition: Condition) {
    this.selectedCondition = condition;
  }

  private addCondition(condition: AddConditionPayload) {
    this.conditionForm.disable();

    this.conditionsService
      .add(condition)
      .pipe(
        finalize(() => {
          this.conditionForm.enable();
        }),
      )
      .subscribe({
        next: (data) => {
          if (data.success) {
            this.toastr.success(data.message ?? 'Condition added successfully.');
            this.searchResults$.next([]);
            this.searchTerm = '';
            this.selectedCondition = null;
            this.loadConditions();
            this.conditionForm.reset({});
          }
        },
        error: (error) => {
          const message = error?.message || 'Failed to add condition.';
          this.toastr.error(message);
        },
      });
  }

  submit() {
    if (this.mode === InputModeEnum.Manual) {
      if (this.conditionForm.invalid) {
        this.conditionForm.markAllAsTouched();
        return;
      }

      const payload: AddConditionPayload = {
        name: this.conditionForm.value.name ?? '',
        details: this.conditionForm.value.details ?? '',
        status: 'active',
      };

      this.addCondition(payload);
    }

    if (this.mode === InputModeEnum.Search && this.selectedCondition) {
      const payload: AddConditionPayload = {
        name: this.selectedCondition.name ?? '',
        details: this.selectedCondition.details ?? '',
        status: 'active',
      };

      this.addCondition(payload);
    }
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }

  openEditModal(cond: Condition) {
    this.editConditionForm.patchValue(cond);
    const ref = this.modal.open('Edit Condition', this.editModalContent);
    ref.componentInstance.save.subscribe(() => {
      if (this.editConditionForm.invalid) {
        this.editConditionForm.markAllAsTouched();
        return;
      }
      this.editCondition(cond, ref);
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  private editCondition(condition: Condition, ref: any) {
    const payload = {
      name: this.editConditionForm.value.name ?? '',
      details: this.editConditionForm.value.details ?? '',
      status: condition.status ?? 'active',
    };

    ref.componentInstance.setLoading(true);

    this.conditionsService.update(condition.id, payload).subscribe({
      next: (data) => {
        if (data.success) {
          ref.componentInstance.setLoading(false);
          ref.close();
          this.toastr.success('Condition updated successfully.');
          this.loadConditions();
        }
      },
      error: () => {
        ref.componentInstance.setLoading(false);
        this.toastr.error('Failed to update condition.');
      },
    });
  }

  openDeleteModal(condition: Condition) {
    this.confirmService
      .open({
        title: 'Delete Condition',
        description: 'Are you sure you want to delete this condition?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) {
          this.deleteCondition(condition);
        }
      });
  }

  private deleteCondition(condition: Condition) {
    this.conditionsService.delete(condition.id).subscribe({
      next: (data) => {
        if (data.success) {
          this.toastr.success('Condition deleted successfully.');
          this.loadConditions();
        }
      },
      error: (error) => {
        const message = error?.message ?? 'Failed to delete condition.';
        this.toastr.error(message);
      },
    });
  }
}
