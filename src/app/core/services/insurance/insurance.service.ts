import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INSURANCE_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { InsuranceRecord } from '../../interfaces/insurance';
import { ApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private http = inject(HttpClient);
  private apiUrl = inject(INSURANCE_API_URL);

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  update(payload: InsuranceRecord): Observable<ApiResponse<InsuranceRecord>> {
    return this.http.post<ApiResponse<InsuranceRecord>>(this.apiUrl, payload);
  }
}
