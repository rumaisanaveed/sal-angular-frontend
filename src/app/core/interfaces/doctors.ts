export interface Doctor {
  name: string;
  speciality: string;
  service: string;
  phone: string;
  city: string;
  address: string;
  gender: string;
  email?: string;
  salId?: string;
  npiNum?: number;
  state?: string;
  credential?: string;
}

export type DoctorsList = Pick<Doctor, 'name' | 'speciality'> & {
  status: 'current' | 'past';
};
