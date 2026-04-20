import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodDonoServiceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/food-donations';

  foodDonoList = signal<any[]>([]);

  fetchFoodDonos(){
    this.http.get<any[]>(this.apiUrl).subscribe(data => this.foodDonoList.set(data));
  }

  saveFoodDono(data: any){
    return this.http.post(this.apiUrl, data);
  }

  deleteFoodDono(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.foodDonoList.update(list => list.filter(p => p._id !== id)));
  }

  updateFoodDono(id: string, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
