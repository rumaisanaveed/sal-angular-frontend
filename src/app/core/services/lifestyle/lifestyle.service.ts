import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LIFESTYLE_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class LifestyleService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(LIFESTYLE_API_URL)}`;

  get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  update(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data);
  }
}
