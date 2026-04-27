import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { LoginformComponent } from './loginform/loginform.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginformComponent },
  { path: 'user-creation', component: UserCreationComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'food-donation', loadComponent: () => import('./food-donation/food-donation.component').then(m => m.FoodDonationComponent) },
];
