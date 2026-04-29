import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class FoodDonoServiceService {
  private http = inject(HttpClient, { optional: true });
  private userService = inject(UserServiceService);
  private apiUrl = 'http://localhost:3000/api/food-donations';

  foodDonoList = signal<any[]>([]);

  fetchFoodDonos(){
    const headers = this.getAuthHeaders();
    if (this.http) {
      this.http.get<any[]>(this.apiUrl, { headers }).subscribe(data => this.foodDonoList.set(data));
    }
  }

  saveFoodDono(data: any){
    const headers = this.getAuthHeaders();
    if (!this.http) return of(null) as Observable<any>;
    return this.http.post(this.apiUrl, data, { headers });
  }

  deleteFoodDono(id: string){
    const headers = this.getAuthHeaders();
    if (this.http) {
      return this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe(() => this.foodDonoList.update(list => list.filter(p => p._id !== id)));
    }
    return null;
  }

  updateFoodDono(id: string, data: any){
    const headers = this.getAuthHeaders();
    if (!this.http) return of(null) as Observable<any>;
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.token();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
