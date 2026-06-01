import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiResponse } from '../../interfaces';
import { AddDevicePayload, DevicesListResponse } from '../../interfaces/devices';
import { DEVICES_API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private http = inject(HttpClient);
  private apiUrl = `${inject(DEVICES_API_URL)}`;

  getAll(): Observable<DevicesListResponse> {
    return this.http.get<DevicesListResponse>(this.apiUrl);
  }

  add(payload: AddDevicePayload): Observable<BaseApiResponse> {
    return this.http.post<BaseApiResponse>(this.apiUrl, payload);
  }

  update(id: string, payload: AddDevicePayload): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<BaseApiResponse> {
    return this.http.delete<BaseApiResponse>(`${this.apiUrl}/${id}`);
  }
}
