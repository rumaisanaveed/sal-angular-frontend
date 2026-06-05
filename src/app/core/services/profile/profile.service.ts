import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROFILE_API_URL, UPLOAD_FILE_API_URL } from '../tokens';
import { ProfileInfoResponse, UploadImageApiResponse } from '../../interfaces/settings';
import { ApiResponse, BaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = inject(PROFILE_API_URL);
  private fileUploadUrl = inject(UPLOAD_FILE_API_URL);

  get(): Observable<ApiResponse<ProfileInfoResponse>> {
    return this.http.get<ApiResponse<ProfileInfoResponse>>(this.apiUrl);
  }

  update(payload: any): Observable<BaseApiResponse> {
    return this.http.put<BaseApiResponse>(this.apiUrl, payload);
  }

  uploadImage(file: File): Observable<UploadImageApiResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadImageApiResponse>(this.fileUploadUrl, formData);
  }
}
