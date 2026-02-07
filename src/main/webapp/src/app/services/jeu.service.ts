import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jeu } from '../models/jeu.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JeuService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/jeux`;

  getAll(): Observable<Jeu[]> {
    return this.http.get<Jeu[]>(this.apiUrl);
  }

  getById(id: number): Observable<Jeu> {
    return this.http.get<Jeu>(`${this.apiUrl}/${id}`);
  }

  create(jeu: any): Observable<Jeu> {
    return this.http.post<Jeu>(this.apiUrl, jeu);
  }

  update(id: number, jeu: any): Observable<Jeu> {
    return this.http.put<Jeu>(`${this.apiUrl}/${id}`, jeu);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
