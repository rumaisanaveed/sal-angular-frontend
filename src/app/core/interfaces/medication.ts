import { Pagination } from '.';

export interface Medication {
  id: string;
  medicineName: string;
  dosage: string;
  status?: string;
  displayOnCard?: string;
}

export interface MedicationsListResponse {
  medications: Medication[];
  pagination: Pagination;
}

export type MedicationSearchResult = Pick<Medication, 'medicineName' | 'dosage'>;

export type AddMedicationPayload = Omit<Medication, 'id' | 'displayOnCard'>;
