import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HOSPITALS_API_URL } from '../tokens';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(HOSPITALS_API_URL)}`;

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  add(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  update(id: string, payload: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchDoctor(searchTerm: string) {
    const url = `https://clinicaltables.nlm.nih.gov/api/npi_org/v3/search?terms=${encodeURIComponent(
      searchTerm,
    )}&count=10&df=NPI,name.full,provider_type,addr_practice.full,addr_practice.phone`;

    return this.http.get(url);
  }
}
