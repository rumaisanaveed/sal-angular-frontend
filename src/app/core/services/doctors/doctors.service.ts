import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOCTORS_API_URL } from '../tokens';
import { AddDoctorPayload, DoctorsList } from '../../interfaces/doctors';
import { ApiResponse, BaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(DOCTORS_API_URL)}`;

  getAll(): Observable<ApiResponse<DoctorsList[]>> {
    return this.http.get<ApiResponse<DoctorsList[]>>(this.apiUrl);
  }

  add(payload: AddDoctorPayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddDoctorPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }

  searchDoctor(searchTerm: string) {
    const url = `https://clinicaltables.nlm.nih.gov/api/npi_idv/v3/search?terms=${encodeURIComponent(
      searchTerm,
    )}&count=10&df=NPI,name.full,provider_type,gender,name.credential,addr_practice.full,addr_practice.phone,addr_practice.city,addr_practice.state`;

    return this.http.get(url);
  }
}
