export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export type SignupPayload = Omit<User, 'id'> & {
  password: string;
};

export interface SignupResponse {
  success: boolean;
  message: string;
  token: string;
  data: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = SignupResponse & {
  verificationRequired: boolean;
};

export interface VerifyOtpPayload {
  otp: string;
}

export type OtpResponse = Omit<SignupResponse, 'data'>;
