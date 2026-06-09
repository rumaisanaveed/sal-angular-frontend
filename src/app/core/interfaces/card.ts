type MedicalEntry = {
  name: string;
};

type EmergencyContact = {
  name: string;
  phone: string;
  relation: string;
};

export interface ICard {
  patientName: string;
  email: string;
  allergies: MedicalEntry[];
  medications: MedicalEntry[];
  conditions: MedicalEntry[];
  hospitals: MedicalEntry[];
  doctors: MedicalEntry[];
  religion: string;
  emergencyContacts: EmergencyContact[];
  updatedAt: string;
  organDonor: boolean;
  bloodType: string;
  dateOfBirth: string;
  ssn: string;
  ekg: string;
  isSmoker: boolean;
}
