import { Component, inject, signal } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  private userService = inject(UserServiceService);
  user = signal(this.userService.getCurrentUser());
}

