import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserCreationComponent } from './user-creation/user-creation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-creation', component: UserCreationComponent }
];
