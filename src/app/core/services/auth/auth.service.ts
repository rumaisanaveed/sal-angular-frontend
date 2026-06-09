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
}
