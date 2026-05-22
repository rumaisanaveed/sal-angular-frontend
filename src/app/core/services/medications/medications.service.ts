import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MEDICATIONS_API_URL } from '../tokens';
import { Observable } from 'rxjs';
import { AddMedicationPayload, MedicationsListResponse } from '../../interfaces/medication';
import { ApiResponse, BaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MedicationsService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(MEDICATIONS_API_URL)}`;

  getAll(): Observable<ApiResponse<MedicationsListResponse>> {
    return this.http.get<ApiResponse<MedicationsListResponse>>(this.apiUrl);
  }

  add(payload: AddMedicationPayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddMedicationPayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }

  searchMedication(searchTerm: string) {
    const url = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${encodeURIComponent(
      searchTerm,
    )}&count=5&df=DISPLAY_NAME&ef=STRENGTHS_AND_FORMS,RXCUIS`;

    return this.http.get(url);
  }
}
