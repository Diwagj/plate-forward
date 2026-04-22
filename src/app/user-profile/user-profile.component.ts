import { Component, inject, signal } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      <div class="profile-card" *ngIf="user()">
        <img [src]="'/assets/boy.jpeg'" alt="Profile" class="profile-avatar">
        <h3>{{ user()?.name }}</h3>
        <p><strong>Email:</strong> {{ user()?.email }}</p>
        <p><strong>Role:</strong> {{ user()?.role }}</p>
        <a routerLink="/home" class="back-btn">Back to Home</a>
      </div>
      <p *ngIf="!user()">Please log in to view profile.</p>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto 1rem;
      display: block;
      border: 4px solid #007bff;
    }
    .profile-card h3 {
      margin: 0.5rem 0;
      color: #333;
    }
    .profile-card p {
      margin: 0.5rem 0;
      color: #666;
    }
    .back-btn {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s;
    }
    .back-btn:hover {
      background: #0056b3;
    }
  `]
})
export class UserProfileComponent {
  private userService = inject(UserServiceService);
  user = signal(this.userService.getCurrentUser());
}

