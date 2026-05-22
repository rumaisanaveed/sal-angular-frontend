import { Pagination } from '.';

export interface Condition {
  name: string;
  details: string;
  displayOnCard: boolean;
  id: string;
  status?: string;
}

export type AddConditionPayload = Omit<Condition, 'displayOnCard' | 'id'>;

export interface ConditionsListResponse {
  medicalConditions: Condition[];
  pagination: Pagination;
}
