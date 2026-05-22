import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';
import { AddAllergyPayload, AllergiesListResponse } from '../../interfaces/allergies';
import { ALLERGIES_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class AllergiesService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(ALLERGIES_API_URL)}`;

  getAll(): Observable<ApiResponse<AllergiesListResponse>> {
    return this.http.get<ApiResponse<AllergiesListResponse>>(this.apiUrl);
  }

  add(payload: AddAllergyPayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddAllergyPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }
}
