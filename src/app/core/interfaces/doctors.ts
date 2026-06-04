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
  _id: string;
  credential?: string;
}

export type DoctorsList = Pick<Doctor, 'name' | 'speciality' | '_id'> & {
  status: 'current' | 'past';
};

export interface AddDoctorPayload {
  doctorName: string;
  specialityDetails: string;
  role: string;
  status: string;
}
