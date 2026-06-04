import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LIFESTYLE_API_URL } from '../tokens';
import { LifeStyleData } from '../../interfaces/lifestyle';
import { ApiResponse, BaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LifestyleService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(LIFESTYLE_API_URL)}`;

  get(): Observable<ApiResponse<LifeStyleData>> {
    return this.http.get<ApiResponse<LifeStyleData>>(this.apiUrl);
  }

  update(data: any): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(this.apiUrl, data);
  }
}
