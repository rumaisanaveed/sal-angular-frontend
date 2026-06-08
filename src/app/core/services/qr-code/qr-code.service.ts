import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QR_CODE_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class QrCodeService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(QR_CODE_API_URL)}`;

  generate(): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, {});
  }

  get(): Observable<ApiResponse<{ qrCodeData: string }>> {
    return this.http.get<ApiResponse<{ qrCodeData: string }>>(this.apiUrl);
  }
}
