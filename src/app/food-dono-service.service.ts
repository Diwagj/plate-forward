import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodDonoServiceService {
  private http = inject(HttpClient, { optional: true });
  private apiUrl = 'http://localhost:3000/api/food-donations';

  foodDonoList = signal<any[]>([]);

  fetchFoodDonos(){
    if (this.http) {
      this.http.get<any[]>(this.apiUrl).subscribe(data => this.foodDonoList.set(data));
    }
  }

  saveFoodDono(data: any){
    if (!this.http) return of(null) as Observable<any>;
    return this.http.post(this.apiUrl, data);
  }

  deleteFoodDono(id: string){
    if (this.http) {
      return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.foodDonoList.update(list => list.filter(p => p._id !== id)));
    }
    return null;
  }

  updateFoodDono(id: string, data: any){
    if (!this.http) return of(null) as Observable<any>;
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
