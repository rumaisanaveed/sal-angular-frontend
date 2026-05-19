import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Condition, HistoryItem } from '../../core/interfaces/history';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { ModalService } from '../../core/services/modal-service/modal.service';

@Component({
  selector: 'app-history',
  imports: [
    CommonModule,
    MatCheckboxModule,
    SearchBarComponent,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  @ViewChild('editModal') editModalContent!: TemplateRef<any>;
  editingIndex: number | null = null;
  editSelectedCondition: Condition | null = null;
  editConditionResults: Condition[] = [];

  private fb = inject(FormBuilder);
  private modal = inject(ModalService);
  private confirmService = inject(ConfirmationModalService);

  relationsForm = this.fb.group({
    brother: [false],
    sister: [false],
    mother: [false],
    father: [false],
    paternalGrandmother: [false],
    maternalGrandmother: [false],
    paternalGrandfather: [false],
    maternalGrandfather: [false],
    maternalAunt: [false],
    paternalAunt: [false],
    maternalUncle: [false],
    paternalUncle: [false],
  });

  editRelationsForm = this.fb.group({});

  conditionResults: Condition[] = [];
  selectedCondition: Condition | null = null;

  historyData: HistoryItem[] = [];

  searchConditions(value: string) {
    const v = value.toLowerCase();

    const allConditions: Condition[] = [
      { id: '1', name: 'Diabetes' },
      { id: '2', name: 'Hypertension' },
      { id: '3', name: 'Asthma' },
      { id: '4', name: 'Heart Disease' },
      { id: '5', name: 'Cancer' },
    ];

    this.conditionResults = allConditions.filter((c) => c.name.toLowerCase().includes(v));
  }

  selectCondition(condition: Condition) {
    this.selectedCondition = condition;
  }

  private getSelectedRelations(): string[] {
    const value = this.relationsForm.value as Record<string, boolean>;

    return Object.keys(value)
      .filter((key) => value[key])
      .map((key) => this.formatLabel(key));
  }

  addConditionToHistory() {
    if (!this.selectedCondition) return;

    const relations = this.getSelectedRelations();

    this.historyData.push({
      condition: this.selectedCondition.name,
      relations: relations,
    });

    this.resetForm();
  }

  private resetForm() {
    this.selectedCondition = null;
    this.relationsForm.reset({
      brother: false,
      sister: false,
      mother: false,
      father: false,
      paternalGrandmother: false,
      maternalGrandmother: false,
      paternalGrandfather: false,
      maternalGrandfather: false,
      maternalAunt: false,
      paternalAunt: false,
      maternalUncle: false,
      paternalUncle: false,
    });
  }

  private formatLabel(key: string): string {
    const map: Record<string, string> = {
      brother: 'Brother',
      sister: 'Sister',
      mother: 'Mother',
      father: 'Father',
      paternalGrandmother: 'Paternal Grandmother',
      maternalGrandmother: 'Maternal Grandmother',
      paternalGrandfather: 'Paternal Grandfather',
      maternalGrandfather: 'Maternal Grandfather',
      maternalAunt: 'Maternal Aunt',
      paternalAunt: 'Paternal Aunt',
      maternalUncle: 'Maternal Uncle',
      paternalUncle: 'Paternal Uncle',
    };

    return map[key] || key;
  }

  openEditModal(item: HistoryItem, index: number) {
    this.editingIndex = index;

    this.editSelectedCondition = {
      id: '',
      name: item.condition,
    };

    const ref = this.modal.open('Edit History', this.editModalContent);

    const updated: Record<string, boolean> = {};

    Object.keys(this.relationsForm.value).forEach((key) => {
      updated[key] = item.relations.includes(this.formatLabel(key));
    });

    this.editRelationsForm = this.fb.group(updated);

    ref.componentInstance.save.subscribe(() => {
      if (this.editRelationsForm.invalid) return;

      this.saveEdit();
      ref.close();
    });
  }

  saveEdit() {
    if (this.editingIndex === null) return;

    const value = this.editRelationsForm.value as Record<string, boolean>;

    const relations = Object.keys(value)
      .filter((key) => value[key])
      .map((key) => this.formatLabel(key));

    this.historyData[this.editingIndex] = {
      condition: this.editSelectedCondition?.name || '',
      relations,
    };

    this.editingIndex = null;
    this.editSelectedCondition = null;
  }

  openDeleteModal() {
    this.confirmService
      .open({
        title: 'Delete Medical Condition',
        description:
          'Are you sure you want to delete this medical condition from your family history?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) {
        }
      });
  }
}
