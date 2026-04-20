import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/users';

  userList = signal<any[]>([]);

  fetchUsers(){
    this.http.get<any[]>(this.apiUrl).subscribe(data => this.userList.set(data));
  }

  saveUser(data: any){
    return this.http.post(this.apiUrl, data);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.userList.update(list => list.filter(p => p._id !== id)));
  }

  updateUser(id: string, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
