import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { FoodDonoServiceService } from '../food-dono-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private userService = inject(UserServiceService);
  private foodService = inject(FoodDonoServiceService);
  user = signal(this.userService.getCurrentUser());

  requestedDonations = computed(() => {
    const currentUser = this.user();
    if (!currentUser) return [];
    return this.foodService.foodDonoList().filter(d => d.requester && d.requester._id === currentUser.id);
  });

  ngOnInit() {
    this.foodService.fetchFoodDonos();
  }

  markAsReceived(donation: any) {
    this.foodService.deleteFoodDono(donation._id);
  }
}

