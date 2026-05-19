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

  insuranceData = {
    primaryInsurance: 'BCBS',
    primaryInsuranceLabel: 'Blue Cross Blue Shield',
    primaryInsuranceState: 'California',
    primaryInsuranceMemberId: 'PR-889234-XY',

    secondaryInsurance: 'Aetna',
    secondaryInsuranceLabel: 'Aetna Inc.',
    secondaryInsuranceState: '',
    secondaryInsuranceMemberId: 'SEC-112233',

    lifeInsurance: 'NorthwesternMutual',
    lifeInsuranceLabel: 'Northwestern Mutual Life Insurance Company',
    lifeInsuranceMemberId: 'LIFE-992211',

    disabilityInsurance: 'GuardianLife',
    disabilityInsuranceLabel: 'Guardian Life Insurance Company of America',
    disabilityInsuranceMemberId: 'DIS-112299',

    policy:
      'Patient has active medical coverage. Pre-authorizations required for specialist visits. Secondary insurance used for prescription coverage.',
  };

  primaryInsuranceProviders = PRIMARY_INSURANCE_PROVIDERS;

  secondaryInsuranceProviders = SECONDARY_INSURANCE_PROVIDERS;

  lifeInsuranceProviders = LIFE_INSURANCE_PROVIDERS;

  disabilityInsuranceProviders = DISABILITY_INSURANCE_PROVIDERS;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initializeForm();
    this.setupBcbsListeners();
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
