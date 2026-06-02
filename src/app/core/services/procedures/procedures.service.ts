import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PROCEDURES_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { AddProcedurePayload, ProceduresListResponse } from '../../interfaces/procedures';
import { BaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProceduresService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(PROCEDURES_API_URL)}`;

  getAll(): Observable<ProceduresListResponse> {
    return this.http.get<ProceduresListResponse>(this.apiUrl);
  }

  add(payload: AddProcedurePayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddProcedurePayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }
}
