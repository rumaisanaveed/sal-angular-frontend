import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  OtpResponse,
  SignupPayload,
  SignupResponse,
  VerifyOtpPayload,
} from '../../interfaces/auth';
import { AUTH_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(AUTH_API_URL)}`;

  signup(payload: SignupPayload): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, payload);
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload);
  }

  verifyOtp(payload: VerifyOtpPayload): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/verify-otp`, payload);
  }

  resendOtp(): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/resend-otp`, {});
  }

  // QR CODE
  // qr code generation - patients api url + /qr-code
  // fetch qr code - patients api url + /qr-code

  // CARD
  // get patient card - patients api url + /card

  // ACCOUNT TAB
  // get account details - patients api url + /account
  // update account details - patients api url + /account
  // change password - patients api url + /account/password

  // CONTACT INFO TAB
  // get contact info - patients api url + /contact
  // update contact info - patients api url + /contact

  // PROFILE INFO TAB
  // get profile info - patients api url + /profile
  // update profile info - patients api url + /profile

  // PROCEDURES
  // get and add - patients api url + /medical-procedures
  // update and delete - patients api url + /medical-procedures/procedureId

  // FAMILY HISTORY
  // get and add - patients api url + /family-history
  // update and delete - patients api url + /family-history/id

  // LIFESTYLE
  // get and update - patients api url + /lifestyle

  // DOCTORS
  // get and add - patients api url + /doctors
  // update and delete - patients api url + /doctors/doctorId

  // HOSPITALS
  // get and add - patients api url + /hospitals
  // update and delete - patients api url + /hospitals/hospitalId

  // THERAPIES
  // get and add - patients api url + /therapies
  // update and delete - patients api url + /therapies/therapyId

  // DEVICES
  // get and add - patients api url + /medical-devices
  // update and delete - patients api url + /medical-devices/deviceId

  // INSURANCE
}
