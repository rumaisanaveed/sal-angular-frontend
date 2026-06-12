export interface InsuranceRecord {
  primaryInsurance: string;
  primaryInsuranceState: string;
  primaryInsuranceMemberId: string;

  secondaryInsurance: string;
  secondaryInsuranceState: string;
  secondaryInsuranceMemberId: string;

  lifeInsurance: string;
  lifeInsuranceMemberId: string;

  disabilityInsurance: string;
  disabilityInsuranceMemberId: string;

  policy: string;
}
