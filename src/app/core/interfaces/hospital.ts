export interface Hospital {
  name: string;
  service: string;
  speciality: string;
}

export type SelectedHospital = Pick<Hospital, 'name' | 'speciality'>;
