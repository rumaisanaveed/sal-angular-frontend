import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HOSPITALS_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { ApiResponse, BaseApiResponse } from '../../interfaces';
import { AddHospitalPayload, Hospital } from '../../interfaces/hospital';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(HOSPITALS_API_URL)}`;

  getAll(): Observable<ApiResponse<Hospital[]>> {
    return this.http.get<ApiResponse<Hospital[]>>(this.apiUrl);
  }

  add(payload: AddHospitalPayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddHospitalPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }

  searchHospital(searchTerm: string) {
    const url = `https://clinicaltables.nlm.nih.gov/api/npi_org/v3/search?terms=${encodeURIComponent(
      searchTerm,
    )}&count=10&df=NPI,name.full,provider_type,addr_practice.full,addr_practice.phone`;

    return this.http.get(url);
  }
}
