import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';
import { AddConditionPayload, ConditionsListResponse } from '../../interfaces/conditions';
import { CONDITIONS_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class ConditionsService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(CONDITIONS_API_URL)}`;

  getAll(): Observable<ApiResponse<ConditionsListResponse>> {
    return this.http.get<ApiResponse<ConditionsListResponse>>(this.apiUrl);
  }

  add(payload: AddConditionPayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddConditionPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }

  searchCondition(searchTerm: string) {
    const url = `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${encodeURIComponent(
      searchTerm,
    )}&count=5&df=consumer_name,primary_name&ef=icd10cm_codes,term_icd9_code,term_icd9_text`;

    return this.http.get(url);
  }
}
