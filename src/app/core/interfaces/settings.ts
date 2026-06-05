export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AccountDetailsResponse {
  email: string;
  ssn: string;
  fullName: string;
  memberId: string;
}

export type AccountDetailsRequest = Pick<AccountDetailsResponse, 'fullName' | 'ssn'>;

export interface ContactInfoResponse {
  primaryPhoneNumber: string;
  mobilePhone: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
  receiveEmailAlerts: string;
  receiveTextMessages: string;
  subscribeToNewsletter: string;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface ProfileInfoResponse {
  dateOfBirth: string;
  ekgUrl: string;
  profilePicUrl: string;
  height: string;
  weight: string;
  gender: string;
  bloodType: string;
  countryOfBirth: string;
  organDonor: string;
  nationality: string;
  isSmoker: string;
  emergencyContacts: EmergencyContact[];
}

export interface UploadImageApiResponse {
  success: boolean;
  message: string;
  fileUrl: string;
}
