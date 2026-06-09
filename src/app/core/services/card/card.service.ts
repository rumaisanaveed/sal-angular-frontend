import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PATIENT_CARD_API_URL } from '../tokens';
import { ApiResponse } from '../../interfaces';
import { ICard } from '../../interfaces/card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private http = inject(HttpClient);
  private apiUrl = inject(PATIENT_CARD_API_URL);

  get(): Observable<ApiResponse<ICard>> {
    return this.http.get<ApiResponse<ICard>>(this.apiUrl);
  }
}
