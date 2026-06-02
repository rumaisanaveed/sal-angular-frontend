import { Pagination } from '.';

export interface Procedure {
  _id: string;
  procedureName: string;
  description: string;
  medicalCode: string;
  procedureDate: string;
  procedureType: string;
}

export interface ProceduresListResponse {
  success: boolean;
  message: string;
  data: Procedure[];
  pagination: Pagination;
}

export type AddProcedurePayload = Omit<Procedure, '_id'>;
