import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  insuranceData: any = {};

  primaryInsuranceProviders = PRIMARY_INSURANCE_PROVIDERS;

  secondaryInsuranceProviders = SECONDARY_INSURANCE_PROVIDERS;

  lifeInsuranceProviders = LIFE_INSURANCE_PROVIDERS;

  disabilityInsuranceProviders = DISABILITY_INSURANCE_PROVIDERS;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
    this.setupBcbsListeners();
    this.getInsurance();
  }

  private getInsurance(): void {
    this.insuranceService.get().subscribe({
      next: (res) => {
        if (!res.success) return;

        const data = res.data;

        const primaryInsuranceValue = this.getInsuranceValue(
          data.primaryInsurance,
          this.primaryInsuranceProviders,
        );

        const secondaryInsuranceValue = this.getInsuranceValue(
          data.secondaryInsurance,
          this.secondaryInsuranceProviders,
        );

        const lifeInsuranceValue = this.getInsuranceValue(
          data.lifeInsurance,
          this.lifeInsuranceProviders,
        );

        const disabilityInsuranceValue = this.getInsuranceValue(
          data.disabilityInsurance,
          this.disabilityInsuranceProviders,
        );

        this.insuranceData = {
          primaryInsurance: primaryInsuranceValue,
          primaryInsuranceLabel: data.primaryInsurance,
          primaryInsuranceState: data.primaryInsuranceState ?? '',
          primaryInsuranceMemberId: data.primaryInsuranceMemberId ?? '',

          secondaryInsurance: secondaryInsuranceValue,
          secondaryInsuranceLabel: data.secondaryInsurance,
          secondaryInsuranceState: data.secondaryInsuranceState ?? '',
          secondaryInsuranceMemberId: data.secondaryInsuranceMemberId ?? '',

          lifeInsurance: lifeInsuranceValue,
          lifeInsuranceLabel: data.lifeInsurance,
          lifeInsuranceMemberId: data.lifeInsuranceMemberId ?? '',

          disabilityInsurance: disabilityInsuranceValue,
          disabilityInsuranceLabel: data.disabilityInsurance,
          disabilityInsuranceMemberId: data.disabilityInsuranceMemberId ?? '',

          policy: data.policy ?? '',
        };

        this.insuranceForm.patchValue({
          primaryInsurance: primaryInsuranceValue,
          primaryInsuranceState: data.primaryInsuranceState,
          primaryInsuranceMemberId: data.primaryInsuranceMemberId,

          secondaryInsurance: secondaryInsuranceValue,
          secondaryInsuranceState: data.secondaryInsuranceState,
          secondaryInsuranceMemberId: data.secondaryInsuranceMemberId,

          lifeInsurance: lifeInsuranceValue,
          lifeInsuranceMemberId: data.lifeInsuranceMemberId,

          disabilityInsurance: disabilityInsuranceValue,
          disabilityInsuranceMemberId: data.disabilityInsuranceMemberId,

          policy: data.policy,
        });
      },
    });
  }

  private getInsuranceValue(label: string, providers: { value: string; label: string }[]): string {
    return providers.find((p) => p.label === label)?.value ?? '';
  }

  initializeForm(): void {
    this.insuranceForm = this.fb.group({
      primaryInsurance: [this.insuranceData.primaryInsurance],
      primaryInsuranceState: [this.insuranceData.primaryInsuranceState],
      primaryInsuranceMemberId: [this.insuranceData.primaryInsuranceMemberId],

      secondaryInsurance: [this.insuranceData.secondaryInsurance],
      secondaryInsuranceState: [this.insuranceData.secondaryInsuranceState],
      secondaryInsuranceMemberId: [this.insuranceData.secondaryInsuranceMemberId],

      lifeInsurance: [this.insuranceData.lifeInsurance],
      lifeInsuranceMemberId: [this.insuranceData.lifeInsuranceMemberId],

      disabilityInsurance: [this.insuranceData.disabilityInsurance],
      disabilityInsuranceMemberId: [this.insuranceData.disabilityInsuranceMemberId],

      policy: [this.insuranceData.policy],
    });

    this.toggleStateControl(
      'primaryInsuranceState',
      this.insuranceData.primaryInsurance === 'BCBS',
    );

    this.toggleStateControl(
      'secondaryInsuranceState',
      this.insuranceData.secondaryInsurance === 'BCBS',
    );
  }

  get insuranceSummaryItems() {
    return [
      {
        label: 'Primary',
        value: this.insuranceData.primaryInsuranceLabel,
      },
      {
        label: 'Secondary',
        value: this.insuranceData.secondaryInsuranceLabel,
      },
      {
        label: 'Life',
        value: this.insuranceData.lifeInsuranceLabel,
      },
      {
        label: 'Disability',
        value: this.insuranceData.disabilityInsuranceLabel,
      },
    ];
  }

  setupBcbsListeners(): void {
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

  saveInsurance(): void {
    const formValue = this.insuranceForm.value;

    this.insuranceData = {
      ...this.insuranceData,

      // Primary
      primaryInsurance: formValue.primaryInsurance,
      primaryInsuranceLabel: this.getInsuranceLabel(
        formValue.primaryInsurance,
        this.primaryInsuranceProviders,
      ),
      primaryInsuranceState: formValue.primaryInsuranceState,
      primaryInsuranceMemberId: formValue.primaryInsuranceMemberId,

      // Secondary
      secondaryInsurance: formValue.secondaryInsurance,
      secondaryInsuranceLabel: this.getInsuranceLabel(
        formValue.secondaryInsurance,
        this.secondaryInsuranceProviders,
      ),
      secondaryInsuranceState: formValue.secondaryInsuranceState,
      secondaryInsuranceMemberId: formValue.secondaryInsuranceMemberId,

      // Life
      lifeInsurance: formValue.lifeInsurance,
      lifeInsuranceLabel: this.getInsuranceLabel(
        formValue.lifeInsurance,
        this.lifeInsuranceProviders,
      ),
      lifeInsuranceMemberId: formValue.lifeInsuranceMemberId,

      // Disability
      disabilityInsurance: formValue.disabilityInsurance,
      disabilityInsuranceLabel: this.getInsuranceLabel(
        formValue.disabilityInsurance,
        this.disabilityInsuranceProviders,
      ),
      disabilityInsuranceMemberId: formValue.disabilityInsuranceMemberId,

      // Policy
      policy: formValue.policy,
    };
  }

  getInsuranceLabel(value: string, providers: any[]): string {
    const insurance = providers.find((provider) => provider.value === value);

    return insurance?.label || value;
  }

  openEditSection(section: string): void {
    this.editingSection = section;
  }

  cancelEdit(): void {
    this.editingSection = null;

    this.insuranceForm.patchValue({
      // Primary
      primaryInsurance: this.insuranceData.primaryInsurance,
      primaryInsuranceState: this.insuranceData.primaryInsuranceState,
      primaryInsuranceMemberId: this.insuranceData.primaryInsuranceMemberId,

      // Secondary
      secondaryInsurance: this.insuranceData.secondaryInsurance,
      secondaryInsuranceState: this.insuranceData.secondaryInsuranceState,
      secondaryInsuranceMemberId: this.insuranceData.secondaryInsuranceMemberId,

      // Life
      lifeInsurance: this.insuranceData.lifeInsurance,
      lifeInsuranceMemberId: this.insuranceData.lifeInsuranceMemberId,

      // Disability
      disabilityInsurance: this.insuranceData.disabilityInsurance,
      disabilityInsuranceMemberId: this.insuranceData.disabilityInsuranceMemberId,

      // Policy
      policy: this.insuranceData.policy,
    });
  }

  saveSection(): void {
    this.saveInsurance();

    this.editingSection = null;
  }
}
