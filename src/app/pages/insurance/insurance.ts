import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InsuranceViewModeComponent } from '../../components/insurance/insurance-view-mode/insurance-view-mode.component';
import { InsuranceCardHeaderComponent } from '../../components/insurance/insurance-card-header/insurance-card-header.component';
import { InsuranceFormComponent } from '../../components/insurance/insurance-form/insurance-form.component';
import { InsuranceSummaryComponent } from '../../components/insurance/insurance-summary/insurance-summary.component';
import {
  DISABILITY_INSURANCE_PROVIDERS,
  LIFE_INSURANCE_PROVIDERS,
  PRIMARY_INSURANCE_PROVIDERS,
  SECONDARY_INSURANCE_PROVIDERS,
} from '../../constants/insurance';
import { InsuranceService } from '../../core/services/insurance/insurance.service';
import { ToastrService } from 'ngx-toastr';
import { InsuranceRecord } from '../../core/interfaces/insurance';

@Component({
  selector: 'app-insurance',
  imports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    InsuranceViewModeComponent,
    InsuranceCardHeaderComponent,
    InsuranceFormComponent,
    InsuranceSummaryComponent,
  ],
  templateUrl: './insurance.html',
  styleUrl: './insurance.css',
})
export class Insurance {
  insuranceForm!: FormGroup;

  editingSection: string | null = null;

  private insuranceService = inject(InsuranceService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  loading = signal(false);

  insuranceData: Partial<InsuranceRecord> = {};

  primaryInsuranceProviders = PRIMARY_INSURANCE_PROVIDERS;
  secondaryInsuranceProviders = SECONDARY_INSURANCE_PROVIDERS;
  lifeInsuranceProviders = LIFE_INSURANCE_PROVIDERS;
  disabilityInsuranceProviders = DISABILITY_INSURANCE_PROVIDERS;

  ngOnInit(): void {
    this.initializeForm();
    this.setupBcbsListeners();
    this.getInsurance();
  }

  private getInsurance(): void {
    this.loading.set(true);

    this.insuranceService.get().subscribe({
      next: (res) => {
        this.loading.set(false);
        if (!res?.success) return;

        const data = res.data;

        this.insuranceData = {
          primaryInsurance: data.primaryInsurance ?? '',
          primaryInsuranceState: data.primaryInsuranceState ?? '',
          primaryInsuranceMemberId: data.primaryInsuranceMemberId ?? '',

          secondaryInsurance: data.secondaryInsurance ?? '',
          secondaryInsuranceState: data.secondaryInsuranceState ?? '',
          secondaryInsuranceMemberId: data.secondaryInsuranceMemberId ?? '',

          lifeInsurance: data.lifeInsurance ?? '',
          lifeInsuranceMemberId: data.lifeInsuranceMemberId ?? '',

          disabilityInsurance: data.disabilityInsurance ?? '',
          disabilityInsuranceMemberId: data.disabilityInsuranceMemberId ?? '',

          policy: data.policy ?? '',
        };

        this.patchForm();
      },

      error: (err) => {
        this.loading.set(false);
        console.error('Error getting insurance', err);
      },
    });
  }

  private initializeForm(): void {
    this.insuranceForm = this.fb.group({
      primaryInsurance: [''],
      primaryInsuranceState: [''],
      primaryInsuranceMemberId: [''],

      secondaryInsurance: [''],
      secondaryInsuranceState: [''],
      secondaryInsuranceMemberId: [''],

      lifeInsurance: [''],
      lifeInsuranceMemberId: [''],

      disabilityInsurance: [''],
      disabilityInsuranceMemberId: [''],

      policy: [''],
    });
  }

  private patchForm(): void {
    this.insuranceForm.patchValue({
      primaryInsurance: this.insuranceData.primaryInsurance,
      primaryInsuranceState: this.insuranceData.primaryInsuranceState,
      primaryInsuranceMemberId: this.insuranceData.primaryInsuranceMemberId,

      secondaryInsurance: this.insuranceData.secondaryInsurance,
      secondaryInsuranceState: this.insuranceData.secondaryInsuranceState,
      secondaryInsuranceMemberId: this.insuranceData.secondaryInsuranceMemberId,

      lifeInsurance: this.insuranceData.lifeInsurance,
      lifeInsuranceMemberId: this.insuranceData.lifeInsuranceMemberId,

      disabilityInsurance: this.insuranceData.disabilityInsurance,
      disabilityInsuranceMemberId: this.insuranceData.disabilityInsuranceMemberId,

      policy: this.insuranceData.policy,
    });
  }

  private setupBcbsListeners(): void {
    this.insuranceForm.get('primaryInsurance')?.valueChanges.subscribe((value) => {
      this.toggleStateControl('primaryInsuranceState', value === 'BCBS');
    });

    this.insuranceForm.get('secondaryInsurance')?.valueChanges.subscribe((value) => {
      this.toggleStateControl('secondaryInsuranceState', value === 'BCBS');
    });
  }

  private toggleStateControl(controlName: string, enable: boolean): void {
    const control = this.insuranceForm.get(controlName);
    if (!control) return;

    if (enable) {
      control.enable({ emitEvent: false });
    } else {
      control.disable({ emitEvent: false });
      control.setValue('', { emitEvent: false });
    }
  }

  // Getters start

  get insuranceSummaryItems() {
    return [
      {
        label: 'Primary',
        value: this.getLabel(
          this.insuranceData.primaryInsurance ?? '',
          this.primaryInsuranceProviders,
        ),
      },
      {
        label: 'Secondary',
        value: this.getLabel(
          this.insuranceData.secondaryInsurance ?? '',
          this.secondaryInsuranceProviders,
        ),
      },
      {
        label: 'Life',
        value: this.getLabel(this.insuranceData.lifeInsurance ?? '', this.lifeInsuranceProviders),
      },
      {
        label: 'Disability',
        value: this.getLabel(
          this.insuranceData.disabilityInsurance ?? '',
          this.disabilityInsuranceProviders,
        ),
      },
    ];
  }

  getPrimaryLabel(): string {
    return this.getLabel(this.insuranceData.primaryInsurance ?? '', this.primaryInsuranceProviders);
  }

  getSecondaryLabel(): string {
    return this.getLabel(
      this.insuranceData.secondaryInsurance ?? '',
      this.secondaryInsuranceProviders,
    );
  }

  getLifeLabel(): string {
    return this.getLabel(this.insuranceData.lifeInsurance ?? '', this.lifeInsuranceProviders);
  }

  getDisabilityLabel(): string {
    return this.getLabel(
      this.insuranceData.disabilityInsurance ?? '',
      this.disabilityInsuranceProviders,
    );
  }

  private getLabel(value: string, providers: any[]): string {
    return providers.find((p) => p.value === value)?.label ?? value;
  }

  // getters end

  openEditSection(section: string): void {
    this.editingSection = section;
  }

  cancelEdit(): void {
    this.editingSection = null;
    this.patchForm();
  }

  private buildUpdatePayload() {
    const v = this.insuranceForm.getRawValue();

    return {
      primaryInsurance: v.primaryInsurance,
      primaryInsuranceState: v.primaryInsuranceState,
      primaryInsuranceMemberId: v.primaryInsuranceMemberId,

      secondaryInsurance: v.secondaryInsurance,
      secondaryInsuranceState: v.secondaryInsuranceState,
      secondaryInsuranceMemberId: v.secondaryInsuranceMemberId,

      lifeInsurance: v.lifeInsurance,
      lifeInsuranceMemberId: v.lifeInsuranceMemberId,

      disabilityInsurance: v.disabilityInsurance,
      disabilityInsuranceMemberId: v.disabilityInsuranceMemberId,

      policy: v.policy,
    };
  }

  saveSection(): void {
    const payload = this.buildUpdatePayload();
    this.loading.set(true);

    this.insuranceService.update(payload).subscribe({
      next: (res) => {
        this.loading.set(false);

        if (!res?.success) return;

        this.syncFromForm();

        this.editingSection = null;
        this.toastr.success('Insurance updated successfully');
      },

      error: (err) => {
        this.loading.set(false);
        this.toastr.error(err?.error?.message ?? 'Update failed');
      },
    });
  }

  private syncFromForm(): void {
    const v = this.insuranceForm.getRawValue();

    this.insuranceData = {
      primaryInsurance: v.primaryInsurance,
      primaryInsuranceState: v.primaryInsuranceState,
      primaryInsuranceMemberId: v.primaryInsuranceMemberId,

      secondaryInsurance: v.secondaryInsurance,
      secondaryInsuranceState: v.secondaryInsuranceState,
      secondaryInsuranceMemberId: v.secondaryInsuranceMemberId,

      lifeInsurance: v.lifeInsurance,
      lifeInsuranceMemberId: v.lifeInsuranceMemberId,

      disabilityInsurance: v.disabilityInsurance,
      disabilityInsuranceMemberId: v.disabilityInsuranceMemberId,

      policy: v.policy,
    };
  }
}
