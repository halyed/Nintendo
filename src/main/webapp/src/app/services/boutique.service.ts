import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Boutique } from '../models/boutique.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoutiqueService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/boutiques`;

  getAll(): Observable<Boutique[]> {
    return this.http.get<Boutique[]>(this.apiUrl);
  }

  getById(id: number): Observable<Boutique> {
    return this.http.get<Boutique>(`${this.apiUrl}/${id}`);
  }

  create(boutique: any): Observable<Boutique> {
    return this.http.post<Boutique>(this.apiUrl, boutique);
  }

  update(id: number, boutique: any): Observable<Boutique> {
    return this.http.put<Boutique>(`${this.apiUrl}/${id}`, boutique);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
