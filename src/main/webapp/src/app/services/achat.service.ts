import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Achat } from '../models/achat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchatService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/achats`;

  getAll(): Observable<Achat[]> {
    return this.http.get<Achat[]>(this.apiUrl);
  }

  getById(id: number): Observable<Achat> {
    return this.http.get<Achat>(`${this.apiUrl}/${id}`);
  }

  create(clientId: number, achat: any): Observable<Achat> {
    return this.http.post<Achat>(`${this.apiUrl}/clients/${clientId}`, achat);
  }

  update(id: number, achat: any): Observable<Achat> {
    return this.http.put<Achat>(`${this.apiUrl}/${id}`, achat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
