import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CONTACT_INFO_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';
import { ContactInfoResponse } from '../../interfaces/settings';

@Injectable({
  providedIn: 'root',
})
export class ContactInfoService {
  private http = inject(HttpClient);
  private apiUrl = inject(CONTACT_INFO_API_URL);

  get(): Observable<ApiResponse<ContactInfoResponse>> {
    return this.http.get<ApiResponse<ContactInfoResponse>>(this.apiUrl);
  }

  update(payload: any): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(this.apiUrl, payload);
  }
}
