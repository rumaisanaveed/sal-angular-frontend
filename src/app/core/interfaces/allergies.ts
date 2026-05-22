import { Pagination } from '.';

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

export interface AllergiesListResponse {
  allergies: Allergy[];
  pagination: Pagination;
}
