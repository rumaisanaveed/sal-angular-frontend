export interface Medication {
  id: string;
  medicineName: string;
  dosage: string;
  status?: string;
  displayOnCard?: string;
}

export interface MedicationsResponse {
  success: boolean;
  message: string;
  data: {
    medications: Medication[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalAllergies: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export type MedicationSearchResult = Pick<Medication, 'medicineName' | 'dosage'>;

export type AddMedicationPayload = Omit<Medication, 'id' | 'displayOnCard'>;
