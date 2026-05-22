import { Pagination } from '.';

export interface Therapy {
  _id: string;
  name: string;
  description: string;
  status: string;
  frequency: string;
  duration: string;
}

export interface TherapiesListResponse {
  success: boolean;
  message: string;
  data: Therapy[];
  pagination: Pagination;
}

export type AddTherapyPayload = Omit<Therapy, '_id'>;
