export interface Hospital {
  _id: string;
  name: string;
  npiNumber: string;
  speciality: string;
  status: string;
  phone: string;
}

export type SelectedHospital = Omit<Hospital, '_id'>;

export interface AddHospitalPayload {
  name: string;
  npiNumber: string;
  speciality: string;
  status: string;
  phone?: string;
}
