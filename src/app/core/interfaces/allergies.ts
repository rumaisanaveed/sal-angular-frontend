export interface Allergy {
  name: string;
  details: string;
  displayOnCard?: boolean;
  status?: string;
  id: string;
}

export type AddAllergyPayload = {
  name: string;
  details: string;
  status: string;
};

export interface AllergiesResponse {
  success: boolean;
  message: string;
  data: {
    allergies: Allergy[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalAllergies: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface ApiResponse {
  success: boolean;
  message: string;
}
