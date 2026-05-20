import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ALLERGIES_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class AllergiesService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(ALLERGIES_API_URL)}`;

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  add(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }

  update(id: string, payload: any) {
    return this.http.put(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
