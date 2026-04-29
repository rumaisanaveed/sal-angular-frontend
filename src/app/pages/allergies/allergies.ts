import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ModalService } from '../../core/services/modal-service/modal.service';
import { CommonModule } from '@angular/common';
import { Allergy } from '../../core/interfaces/allergies';
import { ConfirmationModalService } from '../../core/services/confirmation-modal-service/confirmation-modal.service';
import { AllergyTableComponent } from '../../components/allergies/allergy-table/allergy-table.component';

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
  ],
  templateUrl: './allergies.html',
  styleUrl: './allergies.css',
})
export class Allergies {
  allergyForm!: FormGroup;
  editAllergyForm!: FormGroup;
  selectedAllergy!: Allergy | null;
  columns = ['name', 'details', 'actions'];
  dataSource = new MatTableDataSource(ALLERGIES_DATA);
  @ViewChild('editModal') editModalContent!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private modal: ModalService,
    private confirmService: ConfirmationModalService,
  ) {
    this.allergyForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.editAllergyForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data, filter) => {
      const search = filter.trim().toLowerCase();

      return (
        data.name.toLowerCase().includes(search) || data.details.toLowerCase().includes(search)
      );
    };
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  openEditModal(allergy: Allergy) {
    this.selectedAllergy = allergy;
    this.editAllergyForm.patchValue(allergy);
    const ref = this.modal.open('Edit Allergy', this.editModalContent);

    ref.componentInstance.save.subscribe(() => {
      if (this.editAllergyForm.invalid) {
        return;
      }
      ref.close();
    });

    ref.componentInstance.cancel.subscribe(() => {});
  }

  openDeleteConfirmationModal() {
    this.confirmService
      .open({
        title: 'Delete Allergy',
        description: 'Are you sure you want to delete this allergy?',
        type: 'danger',
      })
      .subscribe((result) => {
        if (result) {
          console.log('Deleted');
        }
      });
  }
}

const ALLERGIES_DATA: Allergy[] = [
  { name: 'Beans', details: "I've allergy from beans" },
  { name: 'Beans', details: "I've allergy from beans" },
  { name: 'Beans', details: "I've allergy from beans" },
  { name: 'Beans', details: "I've allergy from beans" },
  { name: 'Beans', details: "I've allergy from beans" },
  { name: 'Beans', details: "I've allergy from beans" },
];
