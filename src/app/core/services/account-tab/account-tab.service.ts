import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ACCOUNT_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';
import {
  AccountDetailsRequest,
  AccountDetailsResponse,
  ChangePasswordPayload,
} from '../../interfaces/settings';

@Injectable({
  providedIn: 'root',
})
export class AccountTabService {
  private http = inject(HttpClient);
  private apiUrl = inject(ACCOUNT_API_URL);

  getAccountDetails(): Observable<ApiResponse<AccountDetailsResponse>> {
    return this.http.get<ApiResponse<AccountDetailsResponse>>(this.apiUrl);
  }

  updateAccountDetails(data: AccountDetailsRequest): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(this.apiUrl, data);
  }

  updatePassword(data: ChangePasswordPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/password`, data);
  }
}
