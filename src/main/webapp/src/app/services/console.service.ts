import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Console } from '../models/console.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/consoles`;

  getAll(): Observable<Console[]> {
    return this.http.get<Console[]>(this.apiUrl);
  }

  getById(id: number): Observable<Console> {
    return this.http.get<Console>(`${this.apiUrl}/${id}`);
  }

  create(console: any): Observable<Console> {
    return this.http.post<Console>(this.apiUrl, console);
  }

  update(id: number, console: any): Observable<Console> {
    return this.http.put<Console>(`${this.apiUrl}/${id}`, console);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
