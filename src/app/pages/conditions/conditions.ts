import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ModeSwitchCardComponent } from '../../components/mode-switch-card/mode-switch-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SelectableListComponent } from '../../components/selectable-list/selectable-list.component';
import { SelectedItemComponent } from '../../components/selected-item/selected-item.component';
import { InputModeEnum } from '../../core/constants';
import { ConditionsTableComponent } from '../../components/conditions/conditions-table/conditions-table.component';

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
export class Conditions implements OnInit {
  conditionForm!: FormGroup;
  therapyForm!: FormGroup;
  deviceForm!: FormGroup;

  mode: InputModeEnum = InputModeEnum.Search;

  searchResults: Condition[] = [
    {
      name: 'Hypertension',
      details: 'Chronic',
    },
    {
      name: 'Diabetes',
      details: 'Physical Health',
    },
    {
      name: 'Anxiety',
      details: 'Mental Health',
    },
  ];
  selectedCondition: Condition | null = null;

  dataSource = new MatTableDataSource<Condition>(ALL_CONDITIONS);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.conditionForm = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.therapyForm = this.fb.group({
      therapy: ['', Validators.required],
    });
    this.deviceForm = this.fb.group({
      device: ['', Validators.required],
    });
  }

  switchMode(mode: InputModeEnum) {
    this.mode = mode;
    this.selectedCondition = null;
    this.searchResults = [];
  }

  searchCondition(query: string) {
    if (!query?.trim()) {
      this.searchResults = [];
      return;
    }

    const q = query.toLowerCase();

    this.searchResults = ALL_CONDITIONS.filter((c) => c.name.toLowerCase().includes(q));
  }

  selectCondition(condition: Condition) {
    this.selectedCondition = condition;
  }

  private addCondition(condition: Condition) {}

  submit() {
    if (this.mode === InputModeEnum.Search) {
      if (!this.selectedCondition) return;

      this.addCondition(this.selectedCondition);
      this.selectedCondition = null;
    }

    if (this.mode === InputModeEnum.Manual) {
      if (this.conditionForm.invalid) {
        this.conditionForm.markAllAsTouched();
        return;
      }

      this.addCondition(this.conditionForm.value);
    }

    this.conditionForm.reset({});
    this.searchResults = [];
  }

  applyFilter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }
}

const ALL_CONDITIONS: Condition[] = [
  { name: 'Diabetes', details: 'Physical Health' },
  { name: 'Hypertension', details: 'Chronic' },
  { name: 'Asthma', details: 'Chronic' },
  { name: 'Flu', details: 'Acute' },
  { name: 'Depression', details: 'Mental Health' },
  { name: 'Anxiety', details: 'Mental Health' },
];
