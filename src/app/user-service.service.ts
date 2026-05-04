import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient, { optional: true });
  private apiUrl = 'http://localhost:3000/api';

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public token = signal<string>('');

  constructor() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      this.token.set(token);
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }

  saveUser(data: any): Observable<any> {
    if (!this.http) return of(null) as Observable<any>;
    return this.http.post(`${this.apiUrl}/users`, data).pipe(
      tap((response: any) => {
        this.setSession(response.user, response.token);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    if (!this.http) return of(null) as Observable<any>;
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        this.setSession(response.user, response.token);
      })
    );
  }

  logout() {
    this.currentUserSubject.next(null);
    this.token.set('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private setSession(user: any, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.token.set(token);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  isLoggedIn(): boolean {
    return !!this.token();
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}

