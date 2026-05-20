import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AddAllergyPayload, AllergiesResponse, ApiResponse } from '../../interfaces/allergies';
import { ALLERGIES_API_URL } from '../tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllergiesService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(ALLERGIES_API_URL)}`;

  getAll(): Observable<AllergiesResponse> {
    return this.http.get<AllergiesResponse>(this.apiUrl);
  }

  add(payload: AddAllergyPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddAllergyPayload): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
  }
}
