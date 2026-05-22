import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';
import { AddTherapyPayload, TherapiesListResponse } from '../../interfaces/therapies';
import { THERAPIES_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class TherapiesService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(THERAPIES_API_URL)}`;

  getAll(): Observable<TherapiesListResponse> {
    return this.http.get<TherapiesListResponse>(this.apiUrl);
  }

  add(payload: AddTherapyPayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddTherapyPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }
}
