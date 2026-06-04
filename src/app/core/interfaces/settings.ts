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
